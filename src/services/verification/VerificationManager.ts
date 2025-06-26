
import { BaseVerificationService, VerificationRequest, VerificationResult } from './BaseVerificationService';
import { RightToWorkService } from './RightToWorkService';
import { DrivingLicenceService } from './DrivingLicenceService';
import { NationalInsuranceService } from './NationalInsuranceService';
import { MOTService } from './MOTService';

export class VerificationManager {
  private services: Map<string, BaseVerificationService>;

  constructor() {
    this.services = new Map<string, BaseVerificationService>([
      ['Right to Work Document', new RightToWorkService()],
      ['Driving Licence', new DrivingLicenceService()],
      ['Driving Licence Points Check', new DrivingLicenceService()],
      ['National Insurance Proof', new NationalInsuranceService()],
      ['MOT Certificate', new MOTService()]
    ]);
  }

  async verifyDocument(documentType: string, request: VerificationRequest): Promise<VerificationResult> {
    const service = this.services.get(documentType);
    
    if (!service) {
      return {
        success: false,
        status: 'failed',
        message: `No verification service available for ${documentType}`,
        verificationId: `no-service-${Date.now()}`,
        verifiedAt: new Date().toISOString()
      };
    }

    return await service.verify(request);
  }

  isVerificationRequired(documentType: string): boolean {
    return this.services.has(documentType);
  }

  getRequiredFields(documentType: string): string[] {
    const fieldMap: Record<string, string[]> = {
      'Right to Work Document': ['shareCode', 'dateOfBirth'],
      'Driving Licence': ['licenceNumber', 'checkCode'],
      'Driving Licence Points Check': ['licenceNumber', 'checkCode'],
      'National Insurance Proof': ['nationalInsuranceNumber', 'firstName', 'lastName', 'dateOfBirth'],
      'MOT Certificate': ['registrationNumber']
    };

    return fieldMap[documentType] || [];
  }
}

export const verificationManager = new VerificationManager();
