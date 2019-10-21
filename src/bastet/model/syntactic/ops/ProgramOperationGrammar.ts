/* eslint-disable no-unused-vars */
export type DataLocationIdentifier = string;

export enum DataType {
  VOID,
  LIST,
  MAP,
  STRING,
  INTEGER,
  FLOAT,
  BOOLEAN
}

export interface Expression {
  readonly expressionType: DataType;
}

export enum BinaryCompareOperator {
  LESS_THAN = "<",
  GREATER_THAN = ">",
  LESS_EQUAL_THAN = "<=",
  GREATER_EQUAL_THAN = ">=",
  EQUAL_THAN = "==",
  UNEQUAL_THAN = "!=",
}

export enum BinaryBooleanOperator {
  BOOL_AND = "&&",
  BOOL_OR = "||"
}

export enum BinaryNumberOperator {
  PLUS = "+",
  MINUS = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
  MODULO = "%"
}

export enum BinaryListOperator {
  APPEND = "append",
  CONCAT = "concat"
}

export interface Statement {}

export type BinaryOperator = BinaryCompareOperator | BinaryBooleanOperator;

export interface BinaryExpression extends Expression {
  readonly operand1: Expression;
  readonly operand2: Expression;
  readonly operator: BinaryOperator;
}

export interface NumberExpression extends Expression {}

export interface BooleanExpression extends Expression {}

export interface TimeExpression {}

export interface NowExpression extends TimeExpression {}

export interface TimeFromMillisExpression extends TimeExpression {
  readonly operand: NumberExpression;
}

type TimeExpressions = NowExpression | TimeFromMillisExpression;

export interface BinaryNumberExpression extends NumberExpression {
  readonly operand1: NumberExpression;
  readonly operand2: NumberExpression;
  readonly operator: BinaryNumberOperator;
}

export interface ListExpression extends Expression {}

export interface BinaryListExpression extends ListExpression {
  readonly operator: BinaryListOperator;
  readonly operand1: ListExpression;
  readonly operand2: Expression;
}

export type MessageType = String;

export interface SendAndWaitStatement extends Statement {
  readonly messageType: MessageType;
  readonly payload: Expression;
}

export interface SendStatement extends Statement {
  readonly messageType: MessageType;
  readonly payload: Expression;
}

export interface CloneStatement extends Statement {}

export interface WaitStatement {
  readonly durationMSecs: NumberExpression;
}

export interface AssignmentStatement {
  readonly assignTo: DataLocationIdentifier;
  readonly value: Expression;
}

export type Assumption = BooleanExpression;

export type Statements =
  | SendStatement
  | WaitStatement
  | SendAndWaitStatement
  | AssignmentStatement;

export type ProgramOperation =
  | Statements
  | Assumption;
