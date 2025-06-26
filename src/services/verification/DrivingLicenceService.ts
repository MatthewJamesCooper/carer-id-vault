
import { BaseVerificationService, VerificationRequest, VerificationResult } from './BaseVerificationService';

export interface DrivingLicenceData {
  licenceNumber: string;
  checkCode: string;
  registrationNumber?: string; // For cross-referencing with insurance/MOT
}

export class DrivingLicenceService extends BaseVerificationService {
  constructor() {
    super('https://api.dvla.gov.uk', 'driving-licence');
  }

  async verify(request: VerificationRequest): Promise<VerificationResult> {
    try {
      const data = request.documentData as DrivingLicenceData;
      
      if (!data.licenceNumber || !data.checkCode) {
        return this.createResult(
          false,
          'invalid',
          'Licence number and check code are required'
        );
      }

      const apiResponse = await this.makeApiCall('/driver-enquiry-service', {
        licenceNumber: data.licenceNumber,
        checkCode: data.checkCode
      });

      return this.createResult(
        apiResponse.isValid,
        apiResponse.isValid ? 'verified' : 'failed',
        apiResponse.message,
        {
          licenceType: apiResponse.licenceType,
          categories: apiResponse.categories,
          endorsements: apiResponse.endorsements,
          points: apiResponse.points,
          address: apiResponse.address
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
    return {
      isValid: true,
      message: 'Driving licence is valid and current',
      licenceType: 'Full',
      categories: ['B', 'B1'],
      endorsements: [],
      points: 0,
      address: '123 Test Street, Test City, TE1 2ST',
      expiryDate: '2034-08-15'
    };
  }
}
