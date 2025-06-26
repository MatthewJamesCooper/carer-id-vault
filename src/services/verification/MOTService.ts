
import { BaseVerificationService, VerificationRequest, VerificationResult } from './BaseVerificationService';

export interface MOTData {
  registrationNumber: string;
  make?: string;
  model?: string;
}

export class MOTService extends BaseVerificationService {
  constructor() {
    super('https://beta.check-mot.service.gov.uk', 'mot-certificate');
  }

  async verify(request: VerificationRequest): Promise<VerificationResult> {
    try {
      const data = request.documentData as MOTData;
      
      if (!data.registrationNumber) {
        return this.createResult(
          false,
          'invalid',
          'Vehicle registration number is required'
        );
      }

      const apiResponse = await this.makeApiCall('/trade/vehicles/mot-tests', {
        registration: data.registrationNumber
      });

      return this.createResult(
        apiResponse.hasValidMOT,
        apiResponse.hasValidMOT ? 'verified' : 'failed',
        apiResponse.message,
        {
          make: apiResponse.make,
          model: apiResponse.model,
          colour: apiResponse.colour,
          fuelType: apiResponse.fuelType,
          motTests: apiResponse.motTests,
          taxStatus: apiResponse.taxStatus
        },
        apiResponse.motExpiryDate
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
      hasValidMOT: true,
      message: 'Vehicle has a valid MOT certificate',
      make: 'FORD',
      model: 'FOCUS',
      colour: 'Silver',
      fuelType: 'Petrol',
      motExpiryDate: '2025-03-15',
      taxStatus: 'Taxed',
      motTests: [
        {
          testDate: '2024-03-15',
          testResult: 'PASSED',
          odometerValue: '45000',
          odometerUnit: 'mi'
        }
      ]
    };
  }
}
