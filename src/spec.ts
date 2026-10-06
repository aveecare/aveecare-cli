// The shape of the generated command table in src/generated/commands.ts.

/** How a flag's text is turned into a JSON value. */
export type FieldType = 'string' | 'integer' | 'number' | 'boolean' | 'enum' | 'json';

export interface FieldSpec {
  /** The API's name for the field or query parameter. */
  readonly wire: string;
  /** The flag, without the leading `--`. */
  readonly flag: string;
  readonly type: FieldType;
  /** Repeat the flag to send several values. */
  readonly array?: boolean;
  /** Allowed values of an enum. */
  readonly values?: readonly string[];
  readonly required?: boolean;
  /** `--clear <flag>` sends null. */
  readonly nullable?: boolean;
  readonly description?: string;
}

export interface OperationSpec {
  readonly action: string;
  readonly summary: string;
  readonly description?: string;
  readonly method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  /** For example `/v1/patients/{id}`. */
  readonly path: string;
  /** Path parameters, taken as positional arguments in order. */
  readonly pathParams: readonly string[];
  readonly kind: 'list' | 'object' | 'none';
  readonly scope?: string;
  readonly query: readonly FieldSpec[];
  readonly body?: { readonly required: boolean; readonly fields: readonly FieldSpec[] };
}

export interface ResourceSpec {
  /** The command name, such as `care-plans`. */
  readonly name: string;
  readonly description?: string;
  readonly ops: readonly OperationSpec[];
}
