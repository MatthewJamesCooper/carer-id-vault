import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface Document {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  required: boolean;
  description: string | null;
  created_at: string;
}

export interface UserDocument {
  id: string;
  user_id: string;
  document_id: string;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  status: 'pending' | 'complete' | 'expiring' | 'missing';
  uploaded_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  document: Document;
}

export const useDocuments = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDocuments();
      fetchUserDocuments();
    } else {
      setDocuments([]);
      setUserDocuments([]);
      setLoading(false);
    }
  }, [user]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('priority', { ascending: false });

      if (error) throw error;
      setDocuments((data || []) as Document[]);
    } catch (error: any) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load document types",
        variant: "destructive",
      });
    }
  };

  const fetchUserDocuments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_documents')
        .select(`
          *,
          document:documents(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserDocuments((data || []) as UserDocument[]);
    } catch (error: any) {
      console.error('Error fetching user documents:', error);
      toast({
        title: "Error",
        description: "Failed to load your documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, documentId: string) => {
    if (!user) return false;

    try {
      setUploading(true);
      
      // Create file path with user ID folder
      const filePath = `${user.id}/${documentId}/${file.name}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Create or update user document record
      const documentData = {
        user_id: user.id,
        document_id: documentId,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        status: 'complete' as const,
        uploaded_at: new Date().toISOString()
      };

      const { error: dbError } = await supabase
        .from('user_documents')
        .upsert(documentData, {
          onConflict: 'user_id,document_id'
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      await fetchUserDocuments(); // Refresh the list
      return true;
    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (userDocumentId: string) => {
    try {
      const userDoc = userDocuments.find(doc => doc.id === userDocumentId);
      if (!userDoc) return false;

      // Delete from storage if file exists
      if (userDoc.file_path) {
        await supabase.storage
          .from('documents')
          .remove([userDoc.file_path]);
      }

      // Delete from database
      const { error } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', userDocumentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Document deleted successfully",
      });

      await fetchUserDocuments(); // Refresh the list
      return true;
    } catch (error: any) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
      return false;
    }
  };

  const getDocumentUrl = async (filePath: string) => {
    try {
      const { data } = await supabase.storage
        .from('documents')
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      return data?.signedUrl || null;
    } catch (error) {
      console.error('Error getting document URL:', error);
      return null;
    }
  };

  return {
    documents,
    userDocuments,
    loading,
    uploading,
    uploadDocument,
    deleteDocument,
    getDocumentUrl,
    refetch: () => {
      fetchDocuments();
      fetchUserDocuments();
    }
  };
};