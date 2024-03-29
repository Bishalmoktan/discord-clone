'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { useModal } from '@/hooks/use-modal-store';
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const router = useRouter();
  const { server } = data;

  const [loading, setLoading] = useState(false);

  const isModalOpen = isOpen && type === 'deleteServer';

  const deleteServer = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Are you sure want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {' '}
              {server?.name}{' '}
            </span>{' '}
            server will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={onClose} variant={'ghost'}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={deleteServer}
              variant={'primary'}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteServerModal;
