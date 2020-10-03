/*
 *
 *      Boolean Predicate Abstraction: Pseudocode
 *
 *
 *      Pseudocode for boolean predicate abstraction by Robert Pernerstorfer
 *
 */
//TODO Remove when completely implemented

/*
 * iteration 1:
 *
 *  public BPA (formula : Z3BooleanFormula, abstractPrecision : list<?> ) : Z2BooleanFormula {
 *      returnFormula : Z3BooleanFormula ;
 *      boolMap : List<PropositionalVariable> ;
 *      !!fill boolMap ;
 *      for ((v:PropositionalVariable) : boolMap) {
 *          checkSet : list<?> ;
 *          counter : int = 0 ;
 *          for ((entry:bool) : v) {
 *              if (entry) {
 *                  checkSet.add(abstractPrecision.get(counter)) ;
 *              } else {
 *                  checkSet.add(boolTheories.not(abstractPrecision.get(counter))) ;
 *              }
 *              counter++ ;
 *          }
 *          if (checkFormulaForSet(formula, checkSet) {
 *              returnFormula.add(setAsFormula(checkSet)) ;
 *          }
 *      }
 *      return returnFormula
 *  }
 *
 * =====================================================================================================================
 *
 * iteration 2:
 *
 *  public BPA (formula : Z3BooleanFormula, abstractPrecision : list<?> ) : Z2BooleanFormula {
 *      returnFormula : Z3BooleanFormula ;
 *      boolMap : List<PropositionalVariable> ;
 *      // filling boolMap
 *      for ( (i:int) ; i < abstractionPrecision.length() ; i++) {
 *          if (boolMap.empty()) {
 *              boolMap.add( new PropositionalVariable(0)) ;
 *              boolMap.add( new PropositionalVariable(1)) ;
 *          } else {
 *              helpMap : List<PropositionalVariable> ;
 *              while (boolMap.notEmpty) {
 *                  var : PropositionalVariable = boolMap.pop();
 *                  helpMap.add( new PropositionalVariable(var, 0)) ;
 *                  helpMap.add( new PropositionalVariable(var, 1)) ;
 *              }
 *              boolMap.add(helpMap) ;
 *          }
 *      }
 *      // allSat
 *      for ((v:PropositionalVariable) : boolMap) {
 *          checkSet : list<?> ;
 *          counter : int = 0 ;
 *          for ((entry:bool) : v) {
 *              if (entry) {
 *                  checkSet.add(abstractPrecision.get(counter)) ;
 *              } else {
 *                  checkSet.add(boolTheories.not(abstractPrecision.get(counter))) ;
 *              }
 *              counter++ ;
 *          }
 *          if (checkFormulaForSet(formula, checkSet) {
 *              returnFormula.add(setAsFormula(checkSet)) ;
 *          }
 *      }
 *      return returnFormula
 *  }
 */