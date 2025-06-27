import { createContext, useContext, useState, ReactNode } from 'react';
import { JsonSchema7 } from '@jsonforms/core';
import { UISchemaElement } from '@jsonforms/core';

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

  return (
    <DesignerContext.Provider
      value={{ schema, uiSchema, formData, errors, setSchema, setUiSchema, setFormData }}>
      {children}
    </DesignerContext.Provider>
  );
};
