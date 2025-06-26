
import { BaseVerificationService, VerificationRequest, VerificationResult } from './BaseVerificationService';

export interface NationalInsuranceData {
  nationalInsuranceNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export class NationalInsuranceService extends BaseVerificationService {
  constructor() {
    super('https://api.service.hmrc.gov.uk', 'national-insurance');
  }

  async verify(request: VerificationRequest): Promise<VerificationResult> {
    try {
      const data = request.documentData as NationalInsuranceData;
      
      if (!data.nationalInsuranceNumber || !data.firstName || !data.lastName || !data.dateOfBirth) {
        return this.createResult(
          false,
          'invalid',
          'All personal details are required for NI verification'
        );
      }

      const apiResponse = await this.makeApiCall('/individuals/details', {
        nino: data.nationalInsuranceNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth
      });

      return this.createResult(
        apiResponse.isValid,
        apiResponse.isValid ? 'verified' : 'failed',
        apiResponse.message,
        {
          status: apiResponse.status,
          category: apiResponse.category,
          lastContribution: apiResponse.lastContribution
        }
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
    return {
      isValid: true,
      message: 'National Insurance number is valid and active',
      status: 'Active',
      category: 'A',
      lastContribution: '2024-05-31'
    };
  }
}
