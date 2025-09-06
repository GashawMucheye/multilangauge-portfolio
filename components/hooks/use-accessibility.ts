'use client';

import { useContext } from 'react';
// This hook is just an alias for the one in the provider file.
// For simplicity, we are keeping the context, provider and hook logic in the same file.
// See /src/components/accessibility-provider.tsx
export { useAccessibility } from '@/components/accessibility-provider';
