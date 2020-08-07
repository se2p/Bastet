grammar Leila;

import LeilaLiterals;

// A program has a name and is composed of a list of actors.
// The term 'actor' is used to describe one entity in the Scratch world.
program : fileType ident importDefinitionList actorDefinitionList EOF ;

fileType : 'program' | 'module' ;

importDefinitionList : importDefinition* ;

importDefinition : 'import' importSelector 'from' resourceLocator ;

importSelector :
  ident # ImportSelectedActor
  | '*' # ImportAllActors
  ;

// Actors in a list of actors are separated by whitespace
actorDefinitionList : actorDefinition* ;

// An actor has a type and an unique identifier.
// It is composed of a set of resources, a set of variables,
// a list of variable initializers,  a set of procedure declarations
// and definitions, and a list of scripts.
// Along to the (user defined) set of variables, an actor has
// *attributes* that influence its representation and behavior.
actorDefinition : actorMode ident inheritsFrom 'begin' actorComponentsDefinition 'end' ;
inheritsFrom : 'is' ident (',' ident)* | ;

actorMode :
  'actor' # ConcreteActorMode
  | 'role' # ActorRoleMode
  ;

actorComponentsDefinition : resourceList declarationStmtList setStmtList methodDefinitionList scriptList ;

// The Scratch programming language is typically used to
// write small games that take produce graphics and sounds as output.
// We use the term 'resources' to denote all images and sounds that
// define the static UI content to compose a Scratch program.
// The type 'image' is used both for the *backdrops* of the stage
// and for the *costumes* of the sprites.
resource : resourceType ident resourceLocator ;

resourceType :
  'image' # ImageResource
  | 'sound' # SoundResource
  ;

// A list of resources is separated by whitespaces.
resourceList : resource* ;

// Decalration of a variable. Depending on the possition of the
// declaration statement, the variable is either local to the actor
// or local to the current stack of a script execution.
declarationStmt : 'declare' ident 'as' type # DeclareVariable ;

// A list of variable declarations.
declarationStmtList : declarationStmt* ;

// The list of datatypes that are allowed for the declaration
// of variables and attributes.
type :
  'list' 'of' type # ListType
  | 'actor' # ActorType
  | primitiveType # Primitive
  ;

primitiveType:
  'int' # IntegerType
  | 'float' # FloatingPointType
  | 'boolean' # BooleanType
  | 'string' # StringType
  | 'enum' '[' expressionListPlain ']' # EnumType
  ;

// A script is the central unit that of a Scratch program that
// defines the behavior (and with it the control and data flow).
script : 'script' scriptIdent 'on' event 'do' scriptAttributeList stmtList ;
scriptIdent :  ident # NamedScriptIdent | # AnonymousScriptIdent ;

// A list of scripts.
scriptList : script* ;

// Attributes that can be assinged to a script
scriptAttributeList : scriptAttribute* ;
scriptAttribute : 'restart' # RestartScript ;

// Scratch programs are written in an event-driven manner.
// The different events that can trigger the execution
// of a script are defined by the non-terminal `event`.
event :
  'never' # NeverEvent
  | 'bootstrap' # BootstapEvent
  | 'bootstrap' 'finished' # AfterBootstrapMonitoringEvent
  | 'startup' # StartupEvent
  | 'started' 'as' 'clone' # CloneStartEvent
  | 'message' stringExpr parameterList messageNamespace # MessageReceivedEvent
  | 'condition' boolExpr # ConditionReachedEvent
  | 'rendered' # RenderedMonitoringEvent
  | 'dispatch' # UserInputDispatchEvent
  | 'statement' 'finished' # AfterStatementMonitoringEvent
  ;

messageNamespace : 'in' String # QualifiedNamespace | #UnqualifiedNamespace ;

// Scratch allows to define procedures, that is,
// reusable code blocks (also known as 'custom blocks').
// A procedure is identified by a name and is parameterized
// to take a number of arguments.
methodDefinitionList : methodDefinition* ;
methodDefinition :
  'define' methodAttributeList ident parameterList stmtList methodResultDeclaration # FullMethodDefinition
  | 'extern' ident parameterList externMethodResultDeclaration # ExternMethodDefinition
  ;

methodResultDeclaration :
  'returns' ident ':' type # FunctionReturnDefinition
  | # VoidReturnDefinition
  ;

externMethodResultDeclaration :
  'returns' type # ExternFunctionReturnDefinition
  | # ExternVoidReturnDefinition
  ;

// Attributes that can be assinged to a method
methodAttributeList : methodAttribute* ;
methodAttribute : 'atomic' # AtomicMethod ;

// A procedure parameter.
parameter : ident ':' type ;

// A list of method parameters in brackets.
parameterList : '(' parameterListPlain ')' ;

// A plain list of method parameters.
// Parameters are separated by comma.
parameterListPlain : parameter (',' parameter)* | ;

// A list of program statements.
// Some statements that terminate the control flow
// are only allowed at the end of the list to
// make their semantics clearer for the programmer.
stmtList : 'begin' stmtListPlain (terminationStmt)? 'end' ;

atomicBlock: 'atomic' stmtList ;

// A plain list of program statements.
// Statements are separated by whitespace.
stmtListPlain : stmt* ;

// The control flow of Scratch program is controlled by
// designated control-flow statements.
controlStmt :
  ifStmt
  | untilStmt
  | repeatTimesStmt
  | repeatForeverStmt
  | callStmt
  ;

// A conditional statement. Either in the form of an 'if ... then ...'
// or an 'if ... then ... else ...'.
ifStmt : 'if' boolExpr 'then' stmtList elseCase ;

elseCase :
  'else' stmtList # PureElse
  | 'else' ifStmt # ElseIfCase
  | # EmptyElseCase
  ;

// Scratch uses `until` instead of `while` which is in
// favour of the game-like nature of most programs written in it.
untilStmt : 'until' boolExpr 'repeat' stmtList   ;

// Repeat a given list of statements N times.
repeatTimesStmt : 'repeat' numExpr 'times' stmtList   ;

// Repeat a given list of statements forever---until the
// program termintates.
repeatForeverStmt : 'repeat' 'forever' stmtList ;

// A statement to call user-defined procedures (custom blocks).
callStmt : ident expressionList ;

// A list of expressions that encapsulates, for example, the arguments
// for procedure calls.
expressionList : '(' expressionListPlain ')' ;

// The expression list without brackets.
// Expressions are separated by comma.
expressionListPlain : expression (',' expression)* | ;

// An expression statement.
// The main aim of having such a statement is to not
// loose information when using Scratch ASTs as
// an transformers representation.
// This statement will get more relevant if functions (custom
// blocks with return values get introduced to Scratch.
expressionStmt : 'evaluate' expression ;

// The list of statements that are available in Scratch.
stmt :
  controlStmt # ControlStatement
  | nonCtrlStmt # NonControlStatement
  | atomicBlock # AtomicBlockStatement
  | '@' Identifier expressionList stmt # AttributedStatement
  ;

nonCtrlStmt :
  expressionStmt
  | commonStmt
  | listStmt
  | declarationStmt
  ;

commonStmt  :
  'wait' numExpr 'seconds' # WaitSecsStatement
  | 'wait' 'until' boolExpr # WaitUntilStatement
  | 'stop' 'other' 'scripts' 'in' 'actor' # StopOthersInActorStatement
  | 'create' 'clone' 'of' stringExpr # CreateCloneOfStatement
  | 'broadcast' message # BroadcastMessageStatement
  | 'broadcast' message 'and' 'wait' # BroadcastAndWaitStatement
  | 'reset' 'timer' # ResetTimerStatement
  | 'epsilon' # EpsilonStatement
  | 'assume' boolExpr # AssumeStatement
  | setStmt # SetStatement
  ;

listStmt :
  'delete' 'all' 'from' variable # DeleteAllFromStatement
  | 'delete'  numExpr  'of'  variable # DeleteIthFromStatement
  | 'add'  stringExpr  'to'  variable # AddElementToStatement
  | 'insert'  stringExpr  'at'  numExpr  'of'  variable # InsertAtStatement
  | 'replace' 'item'  numExpr 'of' variable  'by'  stringExpr # ReplaceElementAtStatement
  ;

setStmt :
  'define' variable 'as' expression # StoreEvalResultStatement
  | 'define' variable 'as' callStmt # StoreCallResultStatement
  ;

setStmtList : setStmt* ;

terminationStmt :
  'stop' 'all' # StopAll
  | 'stop' 'this' 'script' # StopThis
  | 'delete' 'this' 'clone' # DeleteThisClone
  ;

stringExpr :
  String # StringLiteralExpression
  | variable # StringVariableExpression
  | '(' stringExpr ')' # StringParanthExpression
  | callStmt # StringCallStatementExpression

  | 'cast' numExpr 'to' 'string' # NumAsStringExpression
  | 'cast' boolExpr 'to' 'string' # BoolAsStringExpression

  | 'attribute'  stringExpr 'of' actorExpr  # StringAttributeOfExpression  // query an attribute value of an actor (sprites, the stage)

  | 'join'  stringExpr stringExpr # JoinStringsExpression
  | 'letter'  numExpr 'of'  stringExpr # IthLetterOfStringExpression
  | 'item'  numExpr 'of'  variable # IthStringItemOfExpression

  | 'default' String 'for' stringExpr # DefaultStringExpression
  | '?string' # UnspecifiedStringExpression
  ;

boolExpr  :
    Boolean # BoolLiteralExpression
  | variable # BoolVariableExpression
  | '(' boolExpr ')' # BoolParanthExpression
  | callStmt # BoolCallStatementExpression

  | 'cast' numExpr 'to' 'boolean' # NumAsBoolExpression
  | 'cast' stringExpr 'to' 'boolean' # StringAsBoolExpression

  | 'not'  boolExpr # NegatedBoolExpression
  | boolExpr  'and'  boolExpr # BoolAndExpression
  | boolExpr  'or'  boolExpr # BoolOrExpression

  | numOrStringExpr  '>='  numOrStringExpr # GreaterEqualExpression
  | numOrStringExpr  '>'  numOrStringExpr # GreaterThanExpression
  | numOrStringExpr  '<'  numOrStringExpr # LessThanExpression
  | numOrStringExpr  '<='  numOrStringExpr # LessEqualExpression
  | numOrStringExpr  '='  numOrStringExpr # EqualsExpression

  | stringExpr  'contains'  stringExpr # StrContainsExpression

  | 'default' Boolean 'for' boolExpr # DefaultBoolExpression
  | '?bool' # UnspecifiedBoolExpression
  ;

numOrStringExpr :
  numExpr # NumberExpression
  | stringExpr # StringExpression
  ;

numExpr  :
  number # NumLiteralExpression
  | variable # NumVariableExpression
  | '(' numExpr ')' # NumBrackets
  | callStmt # NumCallStatementExpression

  | 'cast' stringExpr 'to' 'float' # StringToFloatExpression
  | 'cast' stringExpr 'to' 'int' # StringToIntExpression
  | 'cast' boolExpr 'to' 'int' # BoolToIntExpression
  | 'cast' numExpr 'to' 'float' # NumToFloatExpression
  | 'cast' numExpr 'to' 'int' # NumToIntExpression

  | 'timer' # TimerExpression

  | 'length' 'of' stringExpr # LengthOfStringExpression
  | 'length' 'of' 'list' variable # LengthOfListExpression
  | 'index' 'of' expression 'in' variable # IndexOfExpression

  | numExpr  '*'  numExpr # NumMulExpression
  | numExpr  '/'  numExpr # NumDivExpression
  | numExpr  'mod'  numExpr # NumModExpression
  | numExpr  '+'  numExpr # NumPlusExpression
  | numExpr  '-'  numExpr # NumMinusExpression

  | 'default' number 'for' numExpr # DefaultNumExpr
  | '?number' # UnspecifiedNumExpr
  ;

listExpr :
  variable # ListVariableExpression
  |  '[' expressionListPlain ']' # ListWithElementsExpression
  ;

actorExpr:
  variable # ActorVariableExpression
  | 'self' # ActorSelfExpression
  | 'locate' 'actor' stringExpr # LocateActorExpression
  | 'start' 'clone' 'of' actorExpr # StartCloneActorExpression
  | 'start' 'actor' stringExpr 'as' ident # UsherActorExpression
  ;

expression :
  stringExpr
  | numExpr
  | boolExpr
  | listExpr
  | actorExpr

  | unspecifiedExpr
  ;

// This type of expression is used to allow for representing
// Scratch programs for that not all expressions have been specified
// as an abstract tree.
unspecifiedExpr : '?expr' ;

variable :
  ident # FlatVariable
  | ident '.' ident # QualifiedVariable
  ;

ident :
  Identifier # IdentExpression
  | 'strid' String # StrIdentExpression
  ;

number :
  IntegerLiteral # IntegerLiteralExpression
  | DecimalLiteral # DecimalLiteralExpression
  ;

Boolean : Bool ;

resourceLocator : String ;

message :
  stringExpr # UserMessage
  | stringExpr expressionList 'to' messageDestination # SystemMessage
  ;

messageDestination :
    String # NamedMessageDestination
    | actorExpr # ActorMessageDestination ;
