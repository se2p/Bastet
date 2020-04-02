grammar ScratchLiterals;

Bool : 'true' | 'false' ;

String : '"' ~('"')* '"' ;

Identifier  :   ('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')* ;

IntegerLiteral: DecimalIntegerLiteral;

DecimalLiteral:                 DecimalIntegerLiteral '.' [0-9] [0-9_]* ExponentPart?
              |                 '.' [0-9] [0-9_]* ExponentPart?
              |                 DecimalIntegerLiteral ExponentPart
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
