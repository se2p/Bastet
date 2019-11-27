grammar Scratch;

// A program has a name and is composed of a list of actors.
// The term 'actor' is used to describe one entity in the Scratch world.
// We use the terms 'script group' and 'entity' as synonyms for 'actor'.
program : 'program' Ident actorDefinitionList ;

// Actors in a list of actors are separated by whitespace
actorDefinitionList : actorDefinition | actorDefinitionList actorDefinition ;

// An actor has a type and an unique identifier.
// It is composed of a set of resources, a set of variables,
// a list of variable initializers,  a set of procedure declarations
// and definitions, and a list of scripts.
// Along to the (user defined) set of variables, an actor has
// *attributes* that influence its representation and behavior.
actorDefinition : actorType Ident 'begin' actorComponentsDefinition 'end' ;

actorComponentsDefinition : resourceList declarationStmtList setStmtList procedureDefinitionList scriptList ;

// Whe distinguish between three types of actors:
// A generic actor type ('actor'), the stage, and a type for sprites.
// Both the stage and the sprites are actors.
// A Scratch program must have at most (and typically at least) one
// actor of type 'stage' and consists of arbitrary many sprites.
actorType : 'actor' | 'stage' | 'sprite' ;

// The Scratch programming language is typically used to
// write small games that take produce graphics and sounds as output.
// We use the term 'resources' to denote all images and sounds that
// define the static UI content to compose a Scratch program.
// The type 'image' is used both for the *backdrops* of the stage
// and for the *costumes* of the sprites.
resource :
     resourceType Ident URI ;

resourceType :
     'image' | 'sound' ;

// A list of resources is separated by whitespaces.
resourceList : resource | resourceList resource ;

// Decalration of a variable. Depending on the possition of the
// declaration statement, the variable is either local to the actor
// or local to the current stack of a script execution.
declarationStmt :
        'declare' Ident 'as' type
     |  'declare' 'attribute' stringExpr 'as' type
     |  'declare' 'attribute' stringExpr 'of' Ident 'as' type ;

// A list of variable declarations.
declarationStmtList : declarationStmt | declarationStmtList declarationStmt ;

// The list of datatypes that are allowed for the declaration
// of variables and attributes.
type :
   'number'
 | 'boolean'
 | 'string'
 | 'enum' '[' expressionListPlain ']'
 | 'list' type
 | 'map' indexType ;

// Maps and lists can be indexed either by numbers or strings.
indexType :
 'number' | 'string' ;

// A script is the central unit that of a Scratch program that
// defines the behavior (and with it the control and data flow).
script : 'script' 'on' event 'do' stmtList ;

// A list of scripts.
scriptList : script | scriptList script ;

// Scratch programs are written in an event-driven manner.
// The different events that can trigger the execution
// of a script are defined by the non-terminal `Event`.
event :
    'never' # NeverEvent
 |  'green' 'flag' # GreenFlagEvent
 |  'started' 'as' 'clone' # CloneStartEvent
 |  'received' 'message' message # MessageReceivedEvent
 |  'reached condition' boolExpr # ConditionReachedEvent
 |  'value' 'of' variable 'above' numExpr # VariableValueEvent
 |  'backdrop' 'switched' 'to' Ident # BackdropChangeEvent
 |  key 'pressed' # KeyEvent
 |  'clicked' # ClickEvent
 ;

// Scratch allows to define procedures, that is,
// reusable code blocks (also known as 'custom blocks').
// A procedure is identified by a name and is parameterized
// to take a number of arguments.
procedureDefinition :
     'procedure' Ident parameterList stmtList ;

// A list of procedure definitions.
procedureDefinitionList :
     procedureDefinition | procedureDefinitionList procedureDefinition ;

// A procedure parameter.
parameter :
     Ident ':' type ;

// A list of procedure parameters in brackets.
parameterList : parameter | parameterList parameter ;

// A plain list of procedure parameters.
// Parameters are separated by comma.
parameterListPlain : parameter | parameterList parameter ;

// A list of program statements.
// Some statements that terminate the control flow
// are only allowed at the end of the list to
// make their semantics clearer for the programmer.
stmtList :
     'begin' stmtListPlain 'end'
   | 'begin' stmtListPlain terminationStmt 'end' ;

// A plain list of program statements.
// Statements are separated by whitespace.
stmtListPlain : stmt | stmtListPlain stmt ;

// The control flow of Scratch program is controlled by
// designated control-flow statements.
controlStmt :
    ifStmt
 |  untilStmt
 |  repeatTimesStmt
 |  repeatForeverStmt ;

// A conditional statement. Either in the form of an 'if ... then ...'
// or an 'if ... then ... else ...'.
ifStmt :
     'if' boolExpr 'then' stmtList
   | 'if' boolExpr 'then' stmtList 'else' stmtList  ;

// Scratch uses `until` instead of `while` which is in
// favour of the game-like nature of most programs written in it.
untilStmt :
   'until' boolExpr 'repeat' stmtList   ;

// Repeat a given list of statements N times.
repeatTimesStmt :
     'repeat' numExpr 'times' stmtList   ;

// Repeat a given list of statements forever---until the
// program termintates.
repeatForeverStmt :
     'repeat' 'forever' stmtList ;

// A statement to call user-defined procedures (custom blocks).
callStmt :
     Ident expressionList ;

// A list of expressions that encapsulates, for example, the arguments
// for procedure calls.
expressionList :
     '(' expressionListPlain ')' ;

// The expression list without brackets.
// Expressions are separated by comma.
expressionListPlain : expression | expressionListPlain ',' expression;

// An expression statement.
// The main aim of having such a statement is to not
// loose information when using Scratch ASTs as
// an intermediate representation.
// This statement will get more relevant if functions (custom
// blocks with return values get introduced to Scratch.
expressionStmt :
     'evaluate' expression ;

// The list of statements that are available in Scratch.
stmt :
    controlStmt
 |  expressionStmt
 |  callStmt
 |  commonStmt
 |  listStmt
 |  spriteMotionStmt
 |  spriteLookStmt
 |  actorLookStmt
 |  actorSoundStmt
 |  declarationStmt  ;

// ------------------------------------------------------------------------------------------------------

commonStmt  :
    'wait' numExpr 'seconds'
 |  'wait' 'until' boolExpr
 |  'stop' 'other' 'scripts' 'in' actorType
 |  'create' 'clone' 'of' Ident
 |  'broadcast' message
 |  'broadcast' message 'and' 'wait'
 |  'reset' 'timer'
 |  'change'  variable 'by' expression
 |  'change' 'attribute' stringExpr 'by' numExpr
 |  setStmt ;

listStmt :
    'delete' 'all' 'of' variable
 |  'delete'  numExpr  'of'  variable
 |  'add'  stringExpr  'to'  variable
 |  'insert'  stringExpr  'at'  numExpr  'of'  variable
 |  'replace' 'item'  numExpr 'of' variable  'by'  stringExpr    ;

setStmt :
    'set' 'attribute' stringExpr 'to' expression
 |  'set' 'attribute' stringExpr 'of' Ident 'to' expression
 |  'set' variable 'to' expression  ;

setStmtList : setStmt | setStmtList setStmt ;

terminationStmt :
    'stop' 'all'
 |  'stop' 'this' 'script'
 |  'delete' 'this' 'clone' ;

spriteMotionStmt  :
    'move'  numExpr  'steps'
 |  'turn' 'right'  numExpr 'degrees'
 |  'turn' 'left'  numExpr 'degrees'
 |  'go' 'to'  position
 |  'glide'  numExpr  'secs' 'to' position
 |  'point' 'in' 'direction' numExpr
 |  'point' 'towards'  position
 |  'change' 'x' 'by'  numExpr
 |  'change' 'y' 'by'  numExpr
 |  'set' 'x' 'to'  numExpr
 |  'set' 'y' 'to'  numExpr
 |  'if' 'on' 'edge' 'bounce' ;

actorLookStmt :
    'ask'  stringExpr  'and' 'wait'
 |  'switch' 'backdrop' 'to'  elementChoice
 |  'switch' 'backdrop' 'to'  elementChoice  'and' 'wait'
 |  'clear' 'graphic' 'effects'
 |  'change' 'graphic' 'effect' stringExpr 'by' numExpr
 |  'set' 'graphic' 'effect' stringExpr 'to' numExpr
 |  'show' 'variable'  variable
 |  'hide' 'variable'  variable ;

spriteLookStmt  :
    'show'
 |  'hide'
 |  'say' stringExpr 'for' numExpr  'secs'
 |  'say' stringExpr
 |  'think' stringExpr 'for' numExpr  'secs'
 |  'think' stringExpr
 |  'switch' 'costume' 'to' elementChoice
 |  'change' 'size' 'by'  numExpr
 |  'set' 'size' 'to'  numExpr  'percent'
 |  'change' 'layer' 'by'  numExpr
 |  'go' 'to' 'layer'  numExpr
 |  'go' 'to' 'front' 'layer'
 |  'go' 'to' 'back' 'layer' ;

actorSoundStmt  :
    'play' 'sound'  elementChoice  'until' 'done'
 |  'start' 'sound'  elementChoice
 |  'change' 'sound' 'effect' stringExpr 'by' numExpr
 |  'set' 'sound' 'effect' stringExpr 'to' numExpr
 |  'clear' 'sound' 'effects'
 |  'stop' 'all' 'sounds' ;

penStmt :
    'erase' 'all'
 |  'stamp'
 |  'pen down'
 |  'pen up'
 |  'set' 'pen' 'color' color
 |  'set' 'pen' stringExpr 'to' numExpr
 |  'change' 'pen' stringExpr 'by' numExpr ;

stringExpr  :
   String
 |  variable
 |  'as' 'string' numExpr
 |  'as' 'string' boolExpr

 |  'attribute'  stringExpr  'of'  Ident                 // query an attribute value of an actor (sprites, the stage)
 |  'resource' 'attribute'  stringExpr 'of'  variable    // query attributes of ressources, for example, the original size
 |  'join'  stringExpr stringExpr
 |  'letter'  numExpr 'of'  stringExpr
 |  'username'
 |  'item'  numExpr 'of'  variable

 |  defaultStringExpr
 |  unspecifiedStringExpr ;

defaultStringExpr :
 'default' String 'for' stringExpr ;

unspecifiedStringExpr :
 '?string' ;

boolExpr  :
    Boolean
 |  variable
 |  '(' boolExpr ')'

 |  'not'  boolExpr
 |  boolExpr  'and'  numExpr
 |  boolExpr  'or'  boolExpr

 |  stringExpr  '>'  stringExpr
 |  stringExpr  '<'  stringExpr
 |  stringExpr  '='  stringExpr

 |  numExpr  '>'  numExpr
 |  numExpr  '<'  numExpr
 |  numExpr  '='  numExpr

 |  stringExpr  'contains'  stringExpr
 |  variable  'contains'  stringExpr

 |  'touching'  touchable
 |  'color'  color  'touches'  color
 |  'key'  key  'pressed'
 |  'mouse' 'down'

 |  defaultBoolExpr
 |  unspecifiedBoolExpr ;

defaultBoolExpr :
     'default' Boolean 'for' boolExpr ;

unspecifiedBoolExpr :
 '?bool' ;

numExpr  :
    number
 |  variable
 | '(' numExpr ')'
 |  'as' 'number'  stringExpr
 |  'as' 'number'  boolExpr

 |  'timer'
 |  'days' 'since' 'milenium'
 |  'current' timeComp
 |  'distanceto' position
 |  'mousex'
 |  'mousey'
 |  'loudness'
 |  'length' 'of' stringExpr
 |  'length' 'of' 'list' variable
 |  'index' 'of' expression 'in' variable
 |  'pick' 'random'  numExpr  'to'  numExpr
 |  'round'  numExpr

 |  numFunct  'of'  numExpr
 |  numExpr  '*'  numExpr
 |  numExpr  '/'  numExpr
 |  numExpr  'mod'  numExpr
 |  numExpr  '+'  numExpr
 |  numExpr  '-'  numExpr

 | defaultNumExpr
 | unspecifiedNumExpr ;

defaultNumExpr :
     'default' number 'for' numExpr ;

unspecifiedNumExpr :
 '?number' ;

numFunct :
   'abs'
|  'floor'
|  'ceiling'
|  'sqrt'
|  'sin'
|  'cos'
|  'tan'
|  'asin'
|  'acos'
|  'atan'
|  'ln'
|  'log'
|  'powe'
|  'powten' ;

listExpr :
    variable
 |  '[' expressionListPlain ']' ;

expression :
    stringExpr
 |  numExpr
 |  boolExpr
 |  listExpr

 |  unspecifiedExpr ;

// This type of expression is used to allow for representing
// Scratch programs for that not all expressions have been specified
// as an abstract tree.
unspecifiedExpr : '?expr' ;

touchable :
 'mousepointer'  |  'edge'  |  color ;

elementChoice :
   'next'
 | 'prev'
 | 'random'
 | 'with_number' numExpr
 | 'with_name' stringExpr ;

timeComp :
    'year'
 |  'month'
 |  'date'
 |  'day' 'of' 'week'
 |  'hour'
 |  'minute'
 |  'second' ;

position  :
    'pivot_of' Ident
 |  'random_pos'
 |  'mouse_pos'
 |  '('  numExpr ',' numExpr  ')' ;

variable :
 Ident | Ident '.' Ident ;

color :
 'rgba' numExpr numExpr numExpr numExpr
 |  'from' 'number' numExpr ;

number : DecimalLiteral ;

Ident : Identifier | 'strid' String ;

Boolean : Bool ;

key : 'key' numExpr ;

URI : String ;

message : stringExpr ;

String : '"' ~('"')+ '"' ;

Bool : 'true' | 'false' ;

Identifier  :   ('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')* ;

DecimalLiteral:                 DecimalIntegerLiteral '.' [0-9] [0-9_]* ExponentPart?
              |                 '.' [0-9] [0-9_]* ExponentPart?
              |                 DecimalIntegerLiteral ExponentPart?
              ;

fragment DecimalIntegerLiteral
    : '0'
    | [1-9] [0-9_]*
    ;

fragment ExponentPart
    : [eE] [+-]? [0-9_]+
    ;

Whitespace
:   [ \t]+
    -> skip
;

Newline
:   (   '\r' '\n'?
    |   '\n'
    )
    -> skip
;

BlockComment
:   '/*' .*? '*/'
    -> skip
;

LineComment
:   '//' ~[\r\n]*
    -> skip
;
