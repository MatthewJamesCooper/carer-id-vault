
import { BaseVerificationService, VerificationRequest, VerificationResult } from './BaseVerificationService';

export interface RightToWorkData {
  shareCode: string;
  dateOfBirth: string;
}

export class RightToWorkService extends BaseVerificationService {
  constructor() {
    super('https://api.gov.uk/immigration-status', 'right-to-work');
  }

  async verify(request: VerificationRequest): Promise<VerificationResult> {
    try {
      const data = request.documentData as RightToWorkData;
      
      if (!data.shareCode || !data.dateOfBirth) {
        return this.createResult(
          false,
          'invalid',
          'Share code and date of birth are required'
        );
      }

      const apiResponse = await this.makeApiCall('/check-immigration-status', {
        shareCode: data.shareCode,
        dateOfBirth: data.dateOfBirth
      });

      return this.createResult(
        apiResponse.hasRightToWork,
        apiResponse.hasRightToWork ? 'verified' : 'failed',
        apiResponse.message,
        {
          visaType: apiResponse.visaType,
          workRestrictions: apiResponse.workRestrictions,
          employer: apiResponse.employer
        },
        apiResponse.expiryDate
      );
    } catch (error) {
      return this.createResult(
        false,
        'failed',
        `Verification failed: ${error}`
      );
    }
  }

  protected getMockResponse(data: any): any {
    // Mock successful response
    const mockResponses = [
      {
        hasRightToWork: true,
        message: 'Individual has the right to work in the UK',
        visaType: 'Indefinite Leave to Remain',
        workRestrictions: 'No restrictions',
        employer: 'Any employer',
        expiryDate: null
      },
      {
        hasRightToWork: true,
        message: 'Individual has the right to work in the UK',
        visaType: 'Tier 2 General',
        workRestrictions: 'Restricted to healthcare sector',
        employer: 'Sponsored employer only',
        expiryDate: '2025-12-31'
      }
    ];
    
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }
}
