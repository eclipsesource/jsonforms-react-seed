import { createContext, useContext, useState, ReactNode } from 'react';
import { JsonSchema7 } from '@jsonforms/core';
import { UISchemaElement } from '@jsonforms/core';

// TODO load and persist forms via REST API, e.g. fetch('/api/forms')
// This will allow sharing schemas between users

export interface DesignerState {
  schema: JsonSchema7;
  uiSchema: UISchemaElement;
  formData: any;
  errors: any[];
}

interface DesignerContextProps extends DesignerState {
  setSchema: (schema: JsonSchema7) => void;
  setUiSchema: (uiSchema: UISchemaElement) => void;
  setFormData: (data: any) => void;
}

const DesignerContext = createContext<DesignerContextProps | undefined>(undefined);

export const useDesigner = () => {
  const ctx = useContext(DesignerContext);
  if (!ctx) throw new Error('DesignerContext missing');
  return ctx;
};

interface ProviderProps {
  children: ReactNode;
  initialSchema: JsonSchema7;
  initialUiSchema: UISchemaElement;
}

export const DesignerProvider = ({ children, initialSchema, initialUiSchema }: ProviderProps) => {
  const [schema, setSchema] = useState<JsonSchema7>(initialSchema);
  const [uiSchema, setUiSchema] = useState<UISchemaElement>(initialUiSchema);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any[]>([]);
  // TODO: expose a `useValidationErrors` hook that updates this state in
  // real time so the editors can highlight issues as the user types.

  // TODO replace local initialSchema with data loaded from the forms API

  return (
    <DesignerContext.Provider
      value={{ schema, uiSchema, formData, errors, setSchema, setUiSchema, setFormData }}>
      {children}
    </DesignerContext.Provider>
  );
};
