
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle, X, RefreshCw } from 'lucide-react';
import { VerificationResult } from '@/services/verification/BaseVerificationService';

interface VerificationStatusProps {
  result?: VerificationResult;
  isLoading?: boolean;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
        Verifying...
      </Badge>
    );
  }

  if (!result) {
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
        <Clock className="w-3 h-3 mr-1" />
        Pending Verification
      </Badge>
    );
  }

  const statusConfig = {
    verified: {
      icon: CheckCircle,
      className: "bg-green-50 text-green-700 border-green-200",
      label: "Verified"
    },
    failed: {
      icon: X,
      className: "bg-red-50 text-red-700 border-red-200",
      label: "Failed"
    },
    pending: {
      icon: Clock,
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
      label: "Pending"
    },
    expired: {
      icon: AlertTriangle,
      className: "bg-orange-50 text-orange-700 border-orange-200",
      label: "Expired"
    },
    invalid: {
      icon: X,
      className: "bg-red-50 text-red-700 border-red-200",
      label: "Invalid"
    }
  };

  const config = statusConfig[result.status];
  const Icon = config.icon;

  return (
    <div className="space-y-2">
      <Badge variant="outline" className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
      {result.message && (
        <p className="text-sm text-gray-600">{result.message}</p>
      )}
      {result.expiryDate && (
        <p className="text-xs text-gray-500">
          Expires: {new Date(result.expiryDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default VerificationStatus;
