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
 *
 * =====================================================================================================================
 *
 * iteration 3:
 *
 *  public BPA (formula : Z3BooleanFormula, abstractPrecision : list<Z3BooleanFormula> ) : Z3BooleanFormula {
 *      smt = await SMTFactory.createZ3();
 *      ctx = smt.createContext();
 *      theories = smt.createTheories(ctx);
 *      prover = smt.createProver(ctx);
 *      returnFormula : Z3BooleanFormula ;
 *      boolMap : List<PropositionalVariable> ;
 *      // creating boolMap
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
 *          checkSet : list<Z3BooleanFormula> ;
 *          counter : int = 0 ;
 *          for ((entry:bool) : v) {
 *              if (entry === null) {}
 *              else if (entry) {
 *                  checkSet.add(abstractPrecision.get(counter)) ;
 *              } else {
 *                  checkSet.add(boolTheories.not(abstractPrecision.get(counter))) ;
 *              }
 *              counter++ ;
 *          }
 *          // "assigning" the declarations of the checkSet to the formula
 *          setAsFormula : Z3BooleanFormula ;
 *          for ((element:Z3BooleanFormula) : checkSet) {
 *              setAsFormula = theories.boolTheory.and(setAsFormula, element) ;
 *          }
 *          assignedFormula : Z3BooleanFormula = theories.Theory.and(setAsFormula, formula)
 *          prover.push() ;
 *          // checks if Satisfiable assignment for given formula
 *          prover.assert(assignedFormula) ;
 *
 *          if (prover.isSat()) {
 *              returnFormula = theories.boolTheory.or(returnFormula, setAsFormula) ;
 *          }
 *          prover.pop() ;
 *      }
 *      returnFormula = simplify(returnFormula) ;
 *      return returnFormula ;
 *  }
 *
 */