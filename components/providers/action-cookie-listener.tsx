'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export default function ActionCookieListener({
  actionId,
  action,
  resource,
}: {
  actionId: string;
  action: string;
  resource: string;
}) {
  const wasRenderedOnce = useRef(false);

  useEffect(() => {
    if (wasRenderedOnce.current) {
      toast.success(`${resource} was ${action} successfully`);
    }

    wasRenderedOnce.current = true;
  }, [actionId]);

  return null;
}
