grammar Scratch;

import ScratchCore;

event :
    coreEvent # InCoreEvent
 |  'value' 'of' variable 'above' numExpr # VariableValueEvent
 |  'backdrop' 'switched' 'to' Ident # BackdropChangeEvent
 |  key 'pressed' # KeyEvent
 |  'clicked' # ClickEvent
 ;

stmt :
  coreStmt
 |  spriteMotionStmt
 |  actorLookStmt
 |  spriteLookStmt
 |  actorSoundStmt
 |  penStmt ;

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
    coreStringExpr
 |  'username' ;

boolExpr  :
    coreBoolExpr
 |  'touching'  touchable
 |  'color'  color  'touches'  color
 |  'key'  key  'pressed'
 |  'mouse' 'down' ;

numExpr  :
 coreNumExpr
 |  'timer'
 |  'days' 'since' 'milenium'
 |  'current' timeComp
 |  'distanceto' position
 |  'mousex'
 |  'mousey'
 |  'loudness';

touchable :
 'mousepointer'  |  'edge'  |  'sprite' stringExpr | color ;

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
    'pivot_of' stringExpr
 |  'random_pos'
 |  'mouse_pos'
 |  '('  numExpr ',' numExpr  ')' ;

