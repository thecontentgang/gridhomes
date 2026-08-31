export const OPEN_CONTACT_EVENT = 'gridhomes:open-contact';

export interface OpenContactOptions {
  defaultService?: string;
}

export function openContactModal(options?: OpenContactOptions | string) {
  if (typeof window === 'undefined') return;
  
  // Handle string for backward compatibility or direct passing
  const detail = typeof options === 'string' ? { defaultService: options } : options;
  
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT, { detail }));
}