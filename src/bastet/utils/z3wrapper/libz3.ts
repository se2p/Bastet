
import {Uint8, Ptr, Void, Uint32, Sint32, Float, Double, Uint64, Sint64} from './ctypes'
import {WasmJSInstance} from "./wasmInstance";
import {Preconditions} from "../Preconditions";

export class Z3_lbool extends Uint8 {};
export class Z3_tactic extends Ptr { };
export class Z3_pattern extends Ptr { };
export class Z3_context extends Ptr { };
export class Z3_sort_arr extends Ptr { };
export class Z3_ast_vector_arr extends Ptr { };
export class Z3_optimize extends Ptr { };
export class Sint64Arr extends Ptr { };
export class Z3_rcf_num extends Ptr { };
export class Z3_ast_vector extends Ptr { };
export class Z3_constructor extends Ptr { };
export class Z3_goal extends Ptr { };
export class Z3_probe extends Ptr { };
export class Z3_func_decl extends Ptr { };
export class Z3_constructor_arr extends Ptr { };
export class Z3_rcf_num_arr extends Ptr { };
export class Z3_param_descrs extends Ptr { };
export class Uint32Arr extends Ptr { };
export class Z3_pattern_arr extends Ptr { };
export class Z3_ast_map extends Ptr { };
export class string_arr extends Ptr { };
export class Z3_symbol extends Ptr { };
export class Z3_ast extends Ptr { };
export class Z3_solver extends Ptr { };
export class Z3_constructor_list_arr extends Ptr { };
export class Z3_tactic_arr extends Ptr { };
export class Uint64Arr extends Ptr { };
export class Z3_func_interp extends Ptr { };
export class Z3_apply_result extends Ptr { };
export class Z3_param extends Ptr { };
export class Bool extends Uint8 { };
export class Sint32Arr extends Ptr { };
export class Z3_sort extends Ptr { };
export class Z3_fixedpoint extends Ptr { };
export class Z3_func_decl_arr extends Ptr { };
export class Z3_config extends Ptr { };
export class Z3_symbol_arr extends Ptr { };
export class Z3_func_entry extends Ptr { };
export class Z3_model_arr extends Ptr { };
export class Z3_ast_arr extends Ptr { };
export class Z3_stats extends Ptr { };
export class Z3_constructorList extends Ptr { };
export class Z3_model extends Ptr { };

export class LibZ3InContext {

    private readonly _wasmInstance: WasmJSInstance;
    private readonly _context: Z3_context;

    constructor(wasmInstance: WasmJSInstance, context: Z3_context) {
        Preconditions.checkNotUndefined(wasmInstance);
        Preconditions.checkNotUndefined(context);
        this._wasmInstance = wasmInstance;
        this._context = context;
    }

    public freeContext() {
        this.del_context(this._context);
    }

    get wasmInstance(): WasmJSInstance {
        return this._wasmInstance;
    }

    get context(): Z3_context {
        return this._context;
    }

    algebraic_add(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_algebraic_add', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_div(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_algebraic_div', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_eq(arg1: Z3_ast, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_eq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_eval(arg1: Z3_ast, arg2: Uint32, arg3: Z3_ast_arr): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_algebraic_eval', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    algebraic_ge(arg1: Z3_ast, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_ge', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_gt(arg1: Z3_ast, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_gt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_is_neg(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_is_neg', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    algebraic_is_pos(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_is_pos', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    algebraic_is_value(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_is_value', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    algebraic_is_zero(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_is_zero', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    algebraic_le(arg1: Z3_ast, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_le', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_lt(arg1: Z3_ast, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_lt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_mul(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_algebraic_mul', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_neq(arg1: Z3_ast, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_algebraic_neq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_power(arg1: Z3_ast, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_algebraic_power', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_root(arg1: Z3_ast, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_algebraic_root', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    algebraic_roots(arg1: Z3_ast, arg2: Uint32, arg3: Z3_ast_arr): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_algebraic_roots', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    algebraic_sign(arg1: Z3_ast): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_algebraic_sign', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    algebraic_sub(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_algebraic_sub', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    app_to_ast(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_app_to_ast', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    apply_result_convert_model(arg1: Z3_apply_result, arg2: Uint32, arg3: Z3_model): Z3_model {
        return new Z3_model(this._wasmInstance.ccall('Z3_apply_result_convert_model', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    apply_result_dec_ref(arg1: Z3_apply_result): void {
        this._wasmInstance.ccall('Z3_apply_result_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    apply_result_get_num_subgoals(arg1: Z3_apply_result): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_apply_result_get_num_subgoals', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    apply_result_get_subgoal(arg1: Z3_apply_result, arg2: Uint32): Z3_goal {
        return new Z3_goal(this._wasmInstance.ccall('Z3_apply_result_get_subgoal', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    apply_result_inc_ref(arg1: Z3_apply_result): void {
        this._wasmInstance.ccall('Z3_apply_result_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    apply_result_to_string(arg1: Z3_apply_result): string {
        return this._wasmInstance.ccall('Z3_apply_result_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_map_contains(arg1: Z3_ast_map, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_ast_map_contains', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    ast_map_dec_ref(arg1: Z3_ast_map): void {
        this._wasmInstance.ccall('Z3_ast_map_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_map_erase(arg1: Z3_ast_map, arg2: Z3_ast): void {
        this._wasmInstance.ccall('Z3_ast_map_erase', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    ast_map_find(arg1: Z3_ast_map, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_ast_map_find', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    ast_map_inc_ref(arg1: Z3_ast_map): void {
        this._wasmInstance.ccall('Z3_ast_map_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_map_insert(arg1: Z3_ast_map, arg2: Z3_ast, arg3: Z3_ast): void {
        this._wasmInstance.ccall('Z3_ast_map_insert', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    ast_map_keys(arg1: Z3_ast_map): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_ast_map_keys', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    ast_map_reset(arg1: Z3_ast_map): void {
        this._wasmInstance.ccall('Z3_ast_map_reset', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_map_size(arg1: Z3_ast_map): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_ast_map_size', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    ast_map_to_string(arg1: Z3_ast_map): string {
        return this._wasmInstance.ccall('Z3_ast_map_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_to_string(arg1: Z3_ast): string {
        return this._wasmInstance.ccall('Z3_ast_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_vector_dec_ref(arg1: Z3_ast_vector): void {
        this._wasmInstance.ccall('Z3_ast_vector_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_vector_get(arg1: Z3_ast_vector, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_ast_vector_get', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    ast_vector_inc_ref(arg1: Z3_ast_vector): void {
        this._wasmInstance.ccall('Z3_ast_vector_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_vector_push(arg1: Z3_ast_vector, arg2: Z3_ast): void {
        this._wasmInstance.ccall('Z3_ast_vector_push', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    ast_vector_resize(arg1: Z3_ast_vector, arg2: Uint32): void {
        this._wasmInstance.ccall('Z3_ast_vector_resize', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    ast_vector_set(arg1: Z3_ast_vector, arg2: Uint32, arg3: Z3_ast): void {
        this._wasmInstance.ccall('Z3_ast_vector_set', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    ast_vector_size(arg1: Z3_ast_vector): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_ast_vector_size', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    ast_vector_to_string(arg1: Z3_ast_vector): string {
        return this._wasmInstance.ccall('Z3_ast_vector_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    ast_vector_translate(arg1: Z3_ast_vector, arg2: Z3_context): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_ast_vector_translate', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    benchmark_to_smtlib_string(arg1: string, arg2: string, arg3: string, arg4: string, arg5: Uint32, arg6: Z3_ast_arr, arg7: Z3_ast): string {
        return this._wasmInstance.ccall('Z3_benchmark_to_smtlib_string', 'string', ['number', 'string', 'string', 'string', 'string', 'number', 'number', 'number'], [this._context.val(), arg1, arg2, arg3, arg4, arg5.val(), arg6.val(), arg7.val()])
    }

    check_interpolant(arg1: Uint32, arg2: Z3_ast_arr, arg3: Uint32Arr, arg4: Z3_ast_arr, arg5: string_arr, arg6: Uint32, arg7: Z3_ast_arr): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_check_interpolant', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]))
    }

    compute_interpolant(arg1: Z3_ast, arg2: Z3_param, arg3: Z3_ast_vector_arr, arg4: Z3_model_arr): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_compute_interpolant', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    datatype_update_field(arg1: Z3_func_decl, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_datatype_update_field', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    dec_ref(arg1: Z3_ast): void {
        this._wasmInstance.ccall('Z3_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    del_constructor(arg1: Z3_constructor): void {
        this._wasmInstance.ccall('Z3_del_constructor', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    del_constructor_list(arg1: Z3_constructorList): void {
        this._wasmInstance.ccall('Z3_del_constructor_list', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fixedpoint_add_cover(arg1: Z3_fixedpoint, arg2: Sint32, arg3: Z3_func_decl, arg4: Z3_ast): void {
        this._wasmInstance.ccall('Z3_fixedpoint_add_cover', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()])
    }

    fixedpoint_add_fact(arg1: Z3_fixedpoint, arg2: Z3_func_decl, arg3: Uint32, arg4: Uint32Arr): void {
        this._wasmInstance.ccall('Z3_fixedpoint_add_fact', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()])
    }

    fixedpoint_add_rule(arg1: Z3_fixedpoint, arg2: Z3_ast, arg3: Z3_symbol): void {
        this._wasmInstance.ccall('Z3_fixedpoint_add_rule', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    fixedpoint_assert(arg1: Z3_fixedpoint, arg2: Z3_ast): void {
        this._wasmInstance.ccall('Z3_fixedpoint_assert', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    fixedpoint_dec_ref(arg1: Z3_fixedpoint): void {
        this._wasmInstance.ccall('Z3_fixedpoint_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fixedpoint_from_file(arg1: Z3_fixedpoint, arg2: string): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_fixedpoint_from_file', 'number', ['number', 'number', 'string'], [this._context.val(), arg1.val(), arg2]))
    }

    fixedpoint_from_string(arg1: Z3_fixedpoint, arg2: string): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_fixedpoint_from_string', 'number', ['number', 'number', 'string'], [this._context.val(), arg1.val(), arg2]))
    }

    fixedpoint_get_answer(arg1: Z3_fixedpoint): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_fixedpoint_get_answer', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fixedpoint_get_assertions(arg1: Z3_fixedpoint): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_fixedpoint_get_assertions', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fixedpoint_get_cover_delta(arg1: Z3_fixedpoint, arg2: Sint32, arg3: Z3_func_decl): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_fixedpoint_get_cover_delta', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    fixedpoint_get_help(arg1: Z3_fixedpoint): string {
        return this._wasmInstance.ccall('Z3_fixedpoint_get_help', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fixedpoint_get_num_levels(arg1: Z3_fixedpoint, arg2: Z3_func_decl): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_fixedpoint_get_num_levels', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    fixedpoint_get_param_descrs(arg1: Z3_fixedpoint): Z3_param_descrs {
        return new Z3_param_descrs(this._wasmInstance.ccall('Z3_fixedpoint_get_param_descrs', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fixedpoint_get_reason_unknown(arg1: Z3_fixedpoint): string {
        return this._wasmInstance.ccall('Z3_fixedpoint_get_reason_unknown', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fixedpoint_get_rules(arg1: Z3_fixedpoint): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_fixedpoint_get_rules', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fixedpoint_get_statistics(arg1: Z3_fixedpoint): Z3_stats {
        return new Z3_stats(this._wasmInstance.ccall('Z3_fixedpoint_get_statistics', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fixedpoint_inc_ref(arg1: Z3_fixedpoint): void {
        this._wasmInstance.ccall('Z3_fixedpoint_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fixedpoint_pop(arg1: Z3_fixedpoint): void {
        this._wasmInstance.ccall('Z3_fixedpoint_pop', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fixedpoint_push(arg1: Z3_fixedpoint): void {
        this._wasmInstance.ccall('Z3_fixedpoint_push', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fixedpoint_query(arg1: Z3_fixedpoint, arg2: Z3_ast): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_fixedpoint_query', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    fixedpoint_query_relations(arg1: Z3_fixedpoint, arg2: Uint32, arg3: Z3_func_decl_arr): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_fixedpoint_query_relations', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    fixedpoint_register_relation(arg1: Z3_fixedpoint, arg2: Z3_func_decl): void {
        this._wasmInstance.ccall('Z3_fixedpoint_register_relation', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    fixedpoint_set_params(arg1: Z3_fixedpoint, arg2: Z3_param): void {
        this._wasmInstance.ccall('Z3_fixedpoint_set_params', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    fixedpoint_set_predicate_representation(arg1: Z3_fixedpoint, arg2: Z3_func_decl, arg3: Uint32, arg4: Z3_symbol_arr): void {
        this._wasmInstance.ccall('Z3_fixedpoint_set_predicate_representation', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()])
    }

    fixedpoint_to_string(arg1: Z3_fixedpoint, arg2: Uint32, arg3: Z3_ast_arr): string {
        return this._wasmInstance.ccall('Z3_fixedpoint_to_string', 'string', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    fixedpoint_update_rule(arg1: Z3_fixedpoint, arg2: Z3_ast, arg3: Z3_symbol): void {
        this._wasmInstance.ccall('Z3_fixedpoint_update_rule', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    fpa_get_ebits(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_fpa_get_ebits', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_get_numeral_exponent_bv(arg1: Z3_ast, arg2: Bool): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_fpa_get_numeral_exponent_bv', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    fpa_get_numeral_exponent_int64(arg1: Z3_ast, arg2: Sint64Arr, arg3: Bool): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_get_numeral_exponent_int64', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    fpa_get_numeral_exponent_string(arg1: Z3_ast, arg2: Bool): string {
        return this._wasmInstance.ccall('Z3_fpa_get_numeral_exponent_string', 'string', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    fpa_get_numeral_sign(arg1: Z3_ast, arg2: Sint32Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_get_numeral_sign', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    fpa_get_numeral_sign_bv(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_fpa_get_numeral_sign_bv', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_get_numeral_significand_bv(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_fpa_get_numeral_significand_bv', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_get_numeral_significand_string(arg1: Z3_ast): string {
        return this._wasmInstance.ccall('Z3_fpa_get_numeral_significand_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    fpa_get_numeral_significand_uint64(arg1: Z3_ast, arg2: Uint64Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_get_numeral_significand_uint64', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    fpa_get_sbits(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_fpa_get_sbits', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_is_numeral_inf(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_is_numeral_inf', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_is_numeral_nan(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_is_numeral_nan', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_is_numeral_negative(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_is_numeral_negative', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_is_numeral_normal(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_is_numeral_normal', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_is_numeral_positive(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_is_numeral_positive', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_is_numeral_subnormal(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_is_numeral_subnormal', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    fpa_is_numeral_zero(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_fpa_is_numeral_zero', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    func_decl_to_ast(arg1: Z3_func_decl): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_func_decl_to_ast', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    func_decl_to_string(arg1: Z3_func_decl): string {
        return this._wasmInstance.ccall('Z3_func_decl_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    func_entry_dec_ref(arg1: Z3_func_entry): void {
        this._wasmInstance.ccall('Z3_func_entry_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    func_entry_get_arg(arg1: Z3_func_entry, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_func_entry_get_arg', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    func_entry_get_num_args(arg1: Z3_func_entry): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_func_entry_get_num_args', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    func_entry_get_value(arg1: Z3_func_entry): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_func_entry_get_value', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    func_entry_inc_ref(arg1: Z3_func_entry): void {
        this._wasmInstance.ccall('Z3_func_entry_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    func_interp_dec_ref(arg1: Z3_func_interp): void {
        this._wasmInstance.ccall('Z3_func_interp_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    func_interp_get_arity(arg1: Z3_func_interp): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_func_interp_get_arity', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    func_interp_get_else(arg1: Z3_func_interp): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_func_interp_get_else', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    func_interp_get_entry(arg1: Z3_func_interp, arg2: Uint32): Z3_func_entry {
        return new Z3_func_entry(this._wasmInstance.ccall('Z3_func_interp_get_entry', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    func_interp_get_num_entries(arg1: Z3_func_interp): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_func_interp_get_num_entries', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    func_interp_inc_ref(arg1: Z3_func_interp): void {
        this._wasmInstance.ccall('Z3_func_interp_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    get_algebraic_number_lower(arg1: Z3_ast, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_algebraic_number_lower', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_algebraic_number_upper(arg1: Z3_ast, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_algebraic_number_upper', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_app_arg(arg1: Z3_ast, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_app_arg', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_app_decl(arg1: Z3_ast): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_app_decl', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_app_num_args(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_app_num_args', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_arity(arg1: Z3_func_decl): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_arity', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_array_sort_domain(arg1: Z3_sort): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_array_sort_domain', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_array_sort_range(arg1: Z3_sort): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_array_sort_range', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_as_array_func_decl(arg1: Z3_ast): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_as_array_func_decl', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_ast_hash(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_ast_hash', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_ast_id(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_ast_id', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_ast_kind(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_ast_kind', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_bool_value(arg1: Z3_ast): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_get_bool_value', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_bv_sort_size(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_bv_sort_size', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_datatype_sort_constructor(arg1: Z3_sort, arg2: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_datatype_sort_constructor', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_datatype_sort_constructor_accessor(arg1: Z3_sort, arg2: Uint32, arg3: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_datatype_sort_constructor_accessor', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    get_datatype_sort_num_constructors(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_datatype_sort_num_constructors', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_datatype_sort_recognizer(arg1: Z3_sort, arg2: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_datatype_sort_recognizer', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_decl_ast_parameter(arg1: Z3_func_decl, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_decl_ast_parameter', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_decl_double_parameter(arg1: Z3_func_decl, arg2: Uint32): Double {
        return new Double(this._wasmInstance.ccall('Z3_get_decl_double_parameter', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_decl_func_decl_parameter(arg1: Z3_func_decl, arg2: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_decl_func_decl_parameter', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_decl_int_parameter(arg1: Z3_func_decl, arg2: Uint32): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_get_decl_int_parameter', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_decl_kind(arg1: Z3_func_decl): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_decl_kind', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_decl_name(arg1: Z3_func_decl): Z3_symbol {
        return new Z3_symbol(this._wasmInstance.ccall('Z3_get_decl_name', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_decl_num_parameters(arg1: Z3_func_decl): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_decl_num_parameters', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_decl_parameter_kind(arg1: Z3_func_decl, arg2: Uint32): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_decl_parameter_kind', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_decl_rational_parameter(arg1: Z3_func_decl, arg2: Uint32): string {
        return this._wasmInstance.ccall('Z3_get_decl_rational_parameter', 'string', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    get_decl_sort_parameter(arg1: Z3_func_decl, arg2: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_decl_sort_parameter', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_decl_symbol_parameter(arg1: Z3_func_decl, arg2: Uint32): Z3_symbol {
        return new Z3_symbol(this._wasmInstance.ccall('Z3_get_decl_symbol_parameter', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_denominator(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_denominator', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_domain(arg1: Z3_func_decl, arg2: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_domain', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_domain_size(arg1: Z3_func_decl): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_domain_size', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_error_code(): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_error_code', 'number', ['number'], [this._context.val()]))
    }

    get_error_msg(arg1: Uint32): string {
        return this._wasmInstance.ccall('Z3_get_error_msg', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    get_finite_domain_sort_size(arg1: Z3_sort, arg2: Uint64Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_get_finite_domain_sort_size', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_func_decl_id(arg1: Z3_func_decl): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_func_decl_id', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_implied_equalities(arg1: Z3_solver, arg2: Uint32, arg3: Z3_ast_arr, arg4: Uint32Arr): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_get_implied_equalities', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    get_index_value(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_index_value', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_interpolant(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_param): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_get_interpolant', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    get_num_probes(): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_num_probes', 'number', ['number'], [this._context.val()]))
    }

    get_num_tactics(): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_num_tactics', 'number', ['number'], [this._context.val()]))
    }

    get_numeral_decimal_string(arg1: Z3_ast, arg2: Uint32): string {
        return this._wasmInstance.ccall('Z3_get_numeral_decimal_string', 'string', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    get_numeral_int(arg1: Z3_ast, arg2: Sint32Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_get_numeral_int', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_numeral_int64(arg1: Z3_ast, arg2: Sint64Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_get_numeral_int64', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_numeral_rational_int64(arg1: Z3_ast, arg2: Sint64Arr, arg3: Sint64Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_get_numeral_rational_int64', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    get_numeral_small(arg1: Z3_ast, arg2: Sint64Arr, arg3: Sint64Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_get_numeral_small', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    get_numeral_string(arg1: Z3_ast): string {
        return this._wasmInstance.ccall('Z3_get_numeral_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    get_numeral_uint(arg1: Z3_ast, arg2: Uint32Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_get_numeral_uint', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_numeral_uint64(arg1: Z3_ast, arg2: Uint64Arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_get_numeral_uint64', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_numerator(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_numerator', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_pattern(arg1: Z3_pattern, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_pattern', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_pattern_num_terms(arg1: Z3_pattern): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_pattern_num_terms', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_probe_name(arg1: Uint32): string {
        return this._wasmInstance.ccall('Z3_get_probe_name', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    get_quantifier_body(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_quantifier_body', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_quantifier_bound_name(arg1: Z3_ast, arg2: Uint32): Z3_symbol {
        return new Z3_symbol(this._wasmInstance.ccall('Z3_get_quantifier_bound_name', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_quantifier_bound_sort(arg1: Z3_ast, arg2: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_quantifier_bound_sort', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_quantifier_no_pattern_ast(arg1: Z3_ast, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_quantifier_no_pattern_ast', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_quantifier_num_bound(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_quantifier_num_bound', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_quantifier_num_no_patterns(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_quantifier_num_no_patterns', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_quantifier_num_patterns(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_quantifier_num_patterns', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_quantifier_pattern_ast(arg1: Z3_ast, arg2: Uint32): Z3_pattern {
        return new Z3_pattern(this._wasmInstance.ccall('Z3_get_quantifier_pattern_ast', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_quantifier_weight(arg1: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_quantifier_weight', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_range(arg1: Z3_func_decl): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_range', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_relation_arity(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_relation_arity', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_relation_column(arg1: Z3_sort, arg2: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_relation_column', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_smtlib_assumption(arg1: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_smtlib_assumption', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_smtlib_decl(arg1: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_smtlib_decl', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_smtlib_error(): string {
        return this._wasmInstance.ccall('Z3_get_smtlib_error', 'string', ['number'], [this._context.val()])
    }

    get_smtlib_formula(arg1: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_get_smtlib_formula', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_smtlib_num_assumptions(): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_smtlib_num_assumptions', 'number', ['number'], [this._context.val()]))
    }

    get_smtlib_num_decls(): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_smtlib_num_decls', 'number', ['number'], [this._context.val()]))
    }

    get_smtlib_num_formulas(): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_smtlib_num_formulas', 'number', ['number'], [this._context.val()]))
    }

    get_smtlib_num_sorts(): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_smtlib_num_sorts', 'number', ['number'], [this._context.val()]))
    }

    get_smtlib_sort(arg1: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_smtlib_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_sort(arg1: Z3_ast): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_get_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_sort_id(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_sort_id', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_sort_kind(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_sort_kind', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_sort_name(arg1: Z3_sort): Z3_symbol {
        return new Z3_symbol(this._wasmInstance.ccall('Z3_get_sort_name', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_string(arg1: Z3_ast): string {
        return this._wasmInstance.ccall('Z3_get_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    get_symbol_int(arg1: Z3_symbol): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_get_symbol_int', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_symbol_kind(arg1: Z3_symbol): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_symbol_kind', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_symbol_string(arg1: Z3_symbol): string {
        return this._wasmInstance.ccall('Z3_get_symbol_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    get_tactic_name(arg1: Uint32): string {
        return this._wasmInstance.ccall('Z3_get_tactic_name', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    get_tuple_sort_field_decl(arg1: Z3_sort, arg2: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_tuple_sort_field_decl', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    get_tuple_sort_mk_decl(arg1: Z3_sort): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_get_tuple_sort_mk_decl', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    get_tuple_sort_num_fields(arg1: Z3_sort): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_get_tuple_sort_num_fields', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    global_param_reset_all(): void {
        this._wasmInstance.ccall('Z3_global_param_reset_all', 'number', [], [])
    }

    goal_assert(arg1: Z3_goal, arg2: Z3_ast): void {
        this._wasmInstance.ccall('Z3_goal_assert', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    goal_dec_ref(arg1: Z3_goal): void {
        this._wasmInstance.ccall('Z3_goal_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    goal_depth(arg1: Z3_goal): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_goal_depth', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    goal_formula(arg1: Z3_goal, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_goal_formula', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    goal_inc_ref(arg1: Z3_goal): void {
        this._wasmInstance.ccall('Z3_goal_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    goal_inconsistent(arg1: Z3_goal): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_goal_inconsistent', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    goal_is_decided_sat(arg1: Z3_goal): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_goal_is_decided_sat', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    goal_is_decided_unsat(arg1: Z3_goal): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_goal_is_decided_unsat', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    goal_num_exprs(arg1: Z3_goal): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_goal_num_exprs', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    goal_precision(arg1: Z3_goal): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_goal_precision', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    goal_reset(arg1: Z3_goal): void {
        this._wasmInstance.ccall('Z3_goal_reset', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    goal_size(arg1: Z3_goal): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_goal_size', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    goal_to_string(arg1: Z3_goal): string {
        return this._wasmInstance.ccall('Z3_goal_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    goal_translate(arg1: Z3_goal, arg2: Z3_context): Z3_goal {
        return new Z3_goal(this._wasmInstance.ccall('Z3_goal_translate', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    inc_ref(arg1: Z3_ast): void {
        this._wasmInstance.ccall('Z3_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    interpolation_profile(): string {
        return this._wasmInstance.ccall('Z3_interpolation_profile', 'string', ['number'], [this._context.val()])
    }

    interrupt(): void {
        this._wasmInstance.ccall('Z3_interrupt', 'number', ['number'], [this._context.val()])
    }

    is_algebraic_number(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_algebraic_number', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_app(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_app', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_as_array(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_as_array', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_eq_ast(arg1: Z3_ast, arg2: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_eq_ast', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    is_eq_func_decl(arg1: Z3_func_decl, arg2: Z3_func_decl): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_eq_func_decl', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    is_eq_sort(arg1: Z3_sort, arg2: Z3_sort): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_eq_sort', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    is_numeral_ast(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_numeral_ast', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_quantifier_forall(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_quantifier_forall', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_re_sort(arg1: Z3_sort): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_re_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_seq_sort(arg1: Z3_sort): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_seq_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_string(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_string', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_string_sort(arg1: Z3_sort): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_string_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    is_well_sorted(arg1: Z3_ast): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_is_well_sorted', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_add(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_add', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_and(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_and', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_app(arg1: Z3_func_decl, arg2: Uint32, arg3: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_app', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_array_default(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_array_default', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_array_ext(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_array_ext', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_array_sort(arg1: Z3_sort, arg2: Z3_sort): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_array_sort', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_ast_map(): Z3_ast_map {
        return new Z3_ast_map(this._wasmInstance.ccall('Z3_mk_ast_map', 'number', ['number'], [this._context.val()]))
    }

    mk_ast_vector(): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_mk_ast_vector', 'number', ['number'], [this._context.val()]))
    }

    mk_atleast(arg1: Uint32, arg2: Z3_ast_arr, arg3: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_atleast', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_atmost(arg1: Uint32, arg2: Z3_ast_arr, arg3: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_atmost', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_bool_sort(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_bool_sort', 'number', ['number'], [this._context.val()]))
    }

    mk_bound(arg1: Uint32, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bound', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bv2int(arg1: Z3_ast, arg2: Bool): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bv2int', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bv_sort(arg1: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_bv_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_bvadd(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvadd', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvadd_no_overflow(arg1: Z3_ast, arg2: Z3_ast, arg3: Bool): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvadd_no_overflow', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_bvadd_no_underflow(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvadd_no_underflow', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvand(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvand', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvashr(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvashr', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvlshr(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvlshr', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvmul(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvmul', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvmul_no_overflow(arg1: Z3_ast, arg2: Z3_ast, arg3: Bool): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvmul_no_overflow', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_bvmul_no_underflow(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvmul_no_underflow', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvnand(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvnand', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvneg(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvneg', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_bvneg_no_overflow(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvneg_no_overflow', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_bvnor(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvnor', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvnot(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvnot', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_bvor(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvor', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvredand(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvredand', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_bvredor(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvredor', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_bvsdiv(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsdiv', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsdiv_no_overflow(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsdiv_no_overflow', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsge(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsge', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsgt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsgt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvshl(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvshl', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsle(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsle', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvslt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvslt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsmod(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsmod', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsrem(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsrem', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsub(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsub', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsub_no_overflow(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsub_no_overflow', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvsub_no_underflow(arg1: Z3_ast, arg2: Z3_ast, arg3: Bool): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvsub_no_underflow', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_bvudiv(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvudiv', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvuge(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvuge', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvugt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvugt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvule(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvule', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvult(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvult', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvurem(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvurem', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvxnor(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvxnor', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_bvxor(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_bvxor', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_concat(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_concat', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_const(arg1: Z3_symbol, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_const', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_const_array(arg1: Z3_sort, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_const_array', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_constructor(arg1: Z3_symbol, arg2: Z3_symbol, arg3: Uint32, arg4: Z3_symbol_arr, arg5: Z3_sort_arr, arg6: Uint32Arr): Z3_constructor {
        return new Z3_constructor(this._wasmInstance.ccall('Z3_mk_constructor', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]))
    }

    mk_constructor_list(arg1: Uint32, arg2: Z3_constructor_arr): Z3_constructorList {
        return new Z3_constructorList(this._wasmInstance.ccall('Z3_mk_constructor_list', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_datatype(arg1: Z3_symbol, arg2: Uint32, arg3: Z3_constructor_arr): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_datatype', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_datatypes(arg1: Uint32, arg2: Z3_symbol_arr, arg3: Z3_sort_arr, arg4: Z3_constructor_list_arr): void {
        this._wasmInstance.ccall('Z3_mk_datatypes', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()])
    }

    mk_distinct(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_distinct', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_div(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_div', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_empty_set(arg1: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_empty_set', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_enumeration_sort(arg1: Z3_symbol, arg2: Uint32, arg3: Z3_symbol_arr, arg4: Z3_func_decl_arr, arg5: Z3_func_decl_arr): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_enumeration_sort', 'number', ['number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val()]))
    }

    mk_eq(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_eq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_exists(arg1: Uint32, arg2: Uint32, arg3: Z3_pattern_arr, arg4: Uint32, arg5: Z3_sort_arr, arg6: Z3_symbol_arr, arg7: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_exists', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]))
    }

    mk_exists_const(arg1: Uint32, arg2: Uint32, arg3: Z3_ast_arr, arg4: Uint32, arg5: Z3_pattern_arr, arg6: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_exists_const', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]))
    }

    mk_ext_rotate_left(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_ext_rotate_left', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_ext_rotate_right(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_ext_rotate_right', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_extract(arg1: Uint32, arg2: Uint32, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_extract', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_false(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_false', 'number', ['number'], [this._context.val()]))
    }

    mk_finite_domain_sort(arg1: Z3_symbol, arg2: Uint64): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_finite_domain_sort', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fixedpoint(): Z3_fixedpoint {
        return new Z3_fixedpoint(this._wasmInstance.ccall('Z3_mk_fixedpoint', 'number', ['number'], [this._context.val()]))
    }

    mk_forall(arg1: Uint32, arg2: Uint32, arg3: Z3_pattern_arr, arg4: Uint32, arg5: Z3_sort_arr, arg6: Z3_symbol_arr, arg7: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_forall', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]))
    }

    mk_forall_const(arg1: Uint32, arg2: Uint32, arg3: Z3_ast_arr, arg4: Uint32, arg5: Z3_pattern_arr, arg6: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_forall_const', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]))
    }

    mk_fpa_abs(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_abs', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_add(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_add', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_div(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_div', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_eq(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_eq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_fma(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast, arg4: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_fma', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_fpa_fp(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_fp', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_geq(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_geq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_gt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_gt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_inf(arg1: Z3_sort, arg2: Bool): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_inf', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_is_infinite(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_is_infinite', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_is_nan(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_is_nan', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_is_negative(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_is_negative', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_is_normal(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_is_normal', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_is_positive(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_is_positive', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_is_subnormal(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_is_subnormal', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_is_zero(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_is_zero', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_leq(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_leq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_lt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_lt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_max(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_max', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_min(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_min', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_mul(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_mul', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_nan(arg1: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_nan', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_neg(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_neg', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_numeral_double(arg1: Double, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_numeral_double', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_numeral_float(arg1: Float, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_numeral_float', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_numeral_int(arg1: Sint32, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_numeral_int', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_numeral_int64_uint64(arg1: Bool, arg2: Sint64, arg3: Uint64, arg4: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_numeral_int64_uint64', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_fpa_numeral_int_uint(arg1: Bool, arg2: Sint32, arg3: Uint32, arg4: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_numeral_int_uint', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_fpa_rem(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_rem', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_rna(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_rna', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_rne(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_rne', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_round_nearest_ties_to_away(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_round_nearest_ties_to_away', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_round_nearest_ties_to_even(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_round_nearest_ties_to_even', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_round_to_integral(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_round_to_integral', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_round_toward_negative(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_round_toward_negative', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_round_toward_positive(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_round_toward_positive', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_round_toward_zero(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_round_toward_zero', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_rounding_mode_sort(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_rounding_mode_sort', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_rtn(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_rtn', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_rtp(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_rtp', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_rtz(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_rtz', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort(arg1: Uint32, arg2: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_sort_128(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_128', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort_16(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_16', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort_32(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_32', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort_64(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_64', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort_double(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_double', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort_half(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_half', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort_quadruple(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_quadruple', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sort_single(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_fpa_sort_single', 'number', ['number'], [this._context.val()]))
    }

    mk_fpa_sqrt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_sqrt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_sub(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_sub', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_to_fp_bv(arg1: Z3_ast, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_fp_bv', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fpa_to_fp_float(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_fp_float', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_to_fp_int_real(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast, arg4: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_fp_int_real', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_fpa_to_fp_real(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_fp_real', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_to_fp_signed(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_fp_signed', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_to_fp_unsigned(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_fp_unsigned', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_to_ieee_bv(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_ieee_bv', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_to_real(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_real', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_fpa_to_sbv(arg1: Z3_ast, arg2: Z3_ast, arg3: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_sbv', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_to_ubv(arg1: Z3_ast, arg2: Z3_ast, arg3: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_to_ubv', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_fpa_zero(arg1: Z3_sort, arg2: Bool): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fpa_zero', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_fresh_const(arg1: string, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_fresh_const', 'number', ['number', 'string', 'number'], [this._context.val(), arg1, arg2.val()]))
    }

    mk_fresh_func_decl(arg1: string, arg2: Uint32, arg3: Z3_sort_arr, arg4: Z3_sort): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_mk_fresh_func_decl', 'number', ['number', 'string', 'number', 'number', 'number'], [this._context.val(), arg1, arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_full_set(arg1: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_full_set', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_func_decl(arg1: Z3_symbol, arg2: Uint32, arg3: Z3_sort_arr, arg4: Z3_sort): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_mk_func_decl', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_ge(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_ge', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_goal(arg1: Bool, arg2: Bool, arg3: Bool): Z3_goal {
        return new Z3_goal(this._wasmInstance.ccall('Z3_mk_goal', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_gt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_gt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_iff(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_iff', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_implies(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_implies', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_int(arg1: Sint32, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_int', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_int2bv(arg1: Uint32, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_int2bv', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_int2real(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_int2real', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_int64(arg1: Sint64, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_int64', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_int_sort(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_int_sort', 'number', ['number'], [this._context.val()]))
    }

    mk_int_symbol(arg1: Sint32): Z3_symbol {
        return new Z3_symbol(this._wasmInstance.ccall('Z3_mk_int_symbol', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_int_to_str(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_int_to_str', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_interpolant(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_interpolant', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_is_int(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_is_int', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_ite(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_ite', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_le(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_le', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_list_sort(arg1: Z3_symbol, arg2: Z3_sort, arg3: Z3_func_decl_arr, arg4: Z3_func_decl_arr, arg5: Z3_func_decl_arr, arg6: Z3_func_decl_arr, arg7: Z3_func_decl_arr, arg8: Z3_func_decl_arr): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_list_sort', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val()]))
    }

    mk_lt(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_lt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_map(arg1: Z3_func_decl, arg2: Uint32, arg3: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_map', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_mod(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_mod', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_mul(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_mul', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_not(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_not', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_numeral(arg1: string, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_numeral', 'number', ['number', 'string', 'number'], [this._context.val(), arg1, arg2.val()]))
    }

    mk_optimize(): Z3_optimize {
        return new Z3_optimize(this._wasmInstance.ccall('Z3_mk_optimize', 'number', ['number'], [this._context.val()]))
    }

    mk_or(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_or', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_params(): Z3_param {
        return new Z3_param(this._wasmInstance.ccall('Z3_mk_params', 'number', ['number'], [this._context.val()]))
    }

    mk_pattern(arg1: Uint32, arg2: Z3_ast_arr): Z3_pattern {
        return new Z3_pattern(this._wasmInstance.ccall('Z3_mk_pattern', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_pbeq(arg1: Uint32, arg2: Z3_ast_arr, arg3: Sint32Arr, arg4: Sint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_pbeq', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_pbge(arg1: Uint32, arg2: Z3_ast_arr, arg3: Sint32Arr, arg4: Sint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_pbge', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_pble(arg1: Uint32, arg2: Z3_ast_arr, arg3: Sint32Arr, arg4: Sint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_pble', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    mk_power(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_power', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_probe(arg1: string): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_mk_probe', 'number', ['number', 'string'], [this._context.val(), arg1]))
    }

    mk_quantifier(arg1: Bool, arg2: Uint32, arg3: Uint32, arg4: Z3_pattern_arr, arg5: Uint32, arg6: Z3_sort_arr, arg7: Z3_symbol_arr, arg8: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_quantifier', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val()]))
    }

    mk_quantifier_const(arg1: Bool, arg2: Uint32, arg3: Uint32, arg4: Z3_ast_arr, arg5: Uint32, arg6: Z3_pattern_arr, arg7: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_quantifier_const', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]))
    }

    mk_quantifier_const_ex(arg1: Bool, arg2: Uint32, arg3: Z3_symbol, arg4: Z3_symbol, arg5: Uint32, arg6: Z3_ast_arr, arg7: Uint32, arg8: Z3_pattern_arr, arg9: Uint32, arg10: Z3_ast_arr, arg11: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_quantifier_const_ex', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val(), arg9.val(), arg10.val(), arg11.val()]))
    }

    mk_quantifier_ex(arg1: Bool, arg2: Uint32, arg3: Z3_symbol, arg4: Z3_symbol, arg5: Uint32, arg6: Z3_pattern_arr, arg7: Uint32, arg8: Z3_ast_arr, arg9: Uint32, arg10: Z3_sort_arr, arg11: Z3_symbol_arr, arg12: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_quantifier_ex', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val(), arg9.val(), arg10.val(), arg11.val(), arg12.val()]))
    }

    mk_re_complement(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_complement', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_re_concat(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_concat', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_re_empty(arg1: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_empty', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_re_full(arg1: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_full', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_re_intersect(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_intersect', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_re_loop(arg1: Z3_ast, arg2: Uint32, arg3: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_loop', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_re_option(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_option', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_re_plus(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_plus', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_re_range(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_range', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_re_sort(arg1: Z3_sort): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_re_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_re_star(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_star', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_re_union(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_re_union', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_real(arg1: Sint32, arg2: Sint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_real', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_real2int(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_real2int', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_real_sort(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_real_sort', 'number', ['number'], [this._context.val()]))
    }

    mk_rem(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_rem', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_repeat(arg1: Uint32, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_repeat', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_rotate_left(arg1: Uint32, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_rotate_left', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_rotate_right(arg1: Uint32, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_rotate_right', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_select(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_select', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_seq_at(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_at', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_seq_concat(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_concat', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_seq_contains(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_contains', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_seq_empty(arg1: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_empty', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_seq_extract(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_extract', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_seq_in_re(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_in_re', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_seq_index(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_index', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_seq_length(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_length', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_seq_prefix(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_prefix', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_seq_replace(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_replace', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_seq_sort(arg1: Z3_sort): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_seq_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_seq_suffix(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_suffix', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_seq_to_re(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_to_re', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_seq_unit(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_seq_unit', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_set_add(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_add', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_set_complement(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_complement', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_set_del(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_del', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_set_difference(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_difference', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_set_intersect(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_intersect', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_set_member(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_member', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_set_sort(arg1: Z3_sort): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_set_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_set_subset(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_subset', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_set_union(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_set_union', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_sign_ext(arg1: Uint32, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_sign_ext', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_simple_solver(): Z3_solver {
        return new Z3_solver(this._wasmInstance.ccall('Z3_mk_simple_solver', 'number', ['number'], [this._context.val()]))
    }

    mk_solver(): Z3_solver {
        return new Z3_solver(this._wasmInstance.ccall('Z3_mk_solver', 'number', ['number'], [this._context.val()]))
    }

    mk_solver_for_logic(arg1: Z3_symbol): Z3_solver {
        return new Z3_solver(this._wasmInstance.ccall('Z3_mk_solver_for_logic', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_solver_from_tactic(arg1: Z3_tactic): Z3_solver {
        return new Z3_solver(this._wasmInstance.ccall('Z3_mk_solver_from_tactic', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_store(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_store', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    mk_str_to_int(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_str_to_int', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_string(arg1: string): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_string', 'number', ['number', 'string'], [this._context.val(), arg1]))
    }

    mk_string_sort(): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_string_sort', 'number', ['number'], [this._context.val()]))
    }

    mk_string_symbol(arg1: string): Z3_symbol {
        return new Z3_symbol(this._wasmInstance.ccall('Z3_mk_string_symbol', 'number', ['number', 'string'], [this._context.val(), arg1]))
    }

    mk_sub(arg1: Uint32, arg2: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_sub', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_tactic(arg1: string): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_mk_tactic', 'number', ['number', 'string'], [this._context.val(), arg1]))
    }

    mk_true(): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_true', 'number', ['number'], [this._context.val()]))
    }

    mk_tuple_sort(arg1: Z3_symbol, arg2: Uint32, arg3: Z3_symbol_arr, arg4: Z3_sort_arr, arg5: Z3_func_decl_arr, arg6: Z3_func_decl_arr): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_tuple_sort', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]))
    }

    mk_unary_minus(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_unary_minus', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_uninterpreted_sort(arg1: Z3_symbol): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_mk_uninterpreted_sort', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    mk_unsigned_int(arg1: Uint32, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_unsigned_int', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_unsigned_int64(arg1: Uint64, arg2: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_unsigned_int64', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_xor(arg1: Z3_ast, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_xor', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    mk_zero_ext(arg1: Uint32, arg2: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_mk_zero_ext', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_dec_ref(arg1: Z3_model): void {
        this._wasmInstance.ccall('Z3_model_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    model_eval(arg1: Z3_model, arg2: Z3_ast, arg3: Bool, arg4: Z3_ast_arr): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_model_eval', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    model_get_const_decl(arg1: Z3_model, arg2: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_model_get_const_decl', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_get_const_interp(arg1: Z3_model, arg2: Z3_func_decl): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_model_get_const_interp', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_get_func_decl(arg1: Z3_model, arg2: Uint32): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_model_get_func_decl', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_get_func_interp(arg1: Z3_model, arg2: Z3_func_decl): Z3_func_interp {
        return new Z3_func_interp(this._wasmInstance.ccall('Z3_model_get_func_interp', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_get_num_consts(arg1: Z3_model): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_model_get_num_consts', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    model_get_num_funcs(arg1: Z3_model): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_model_get_num_funcs', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    model_get_num_sorts(arg1: Z3_model): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_model_get_num_sorts', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    model_get_sort(arg1: Z3_model, arg2: Uint32): Z3_sort {
        return new Z3_sort(this._wasmInstance.ccall('Z3_model_get_sort', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_get_sort_universe(arg1: Z3_model, arg2: Z3_sort): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_model_get_sort_universe', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_has_interp(arg1: Z3_model, arg2: Z3_func_decl): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_model_has_interp', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    model_inc_ref(arg1: Z3_model): void {
        this._wasmInstance.ccall('Z3_model_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    model_to_string(arg1: Z3_model): string {
        return this._wasmInstance.ccall('Z3_model_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    optimize_assert(arg1: Z3_optimize, arg2: Z3_ast): void {
        this._wasmInstance.ccall('Z3_optimize_assert', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    optimize_assert_soft(arg1: Z3_optimize, arg2: Z3_ast, arg3: string, arg4: Z3_symbol): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_optimize_assert_soft', 'number', ['number', 'number', 'number', 'string', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3, arg4.val()]))
    }

    optimize_check(arg1: Z3_optimize): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_optimize_check', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    optimize_dec_ref(arg1: Z3_optimize): void {
        this._wasmInstance.ccall('Z3_optimize_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    optimize_from_file(arg1: Z3_optimize, arg2: string): void {
        this._wasmInstance.ccall('Z3_optimize_from_file', 'number', ['number', 'number', 'string'], [this._context.val(), arg1.val(), arg2])
    }

    optimize_from_string(arg1: Z3_optimize, arg2: string): void {
        this._wasmInstance.ccall('Z3_optimize_from_string', 'number', ['number', 'number', 'string'], [this._context.val(), arg1.val(), arg2])
    }

    optimize_get_assertions(arg1: Z3_optimize): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_optimize_get_assertions', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    optimize_get_help(arg1: Z3_optimize): string {
        return this._wasmInstance.ccall('Z3_optimize_get_help', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    optimize_get_lower(arg1: Z3_optimize, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_optimize_get_lower', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    optimize_get_lower_as_vector(arg1: Z3_optimize, arg2: Uint32): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_optimize_get_lower_as_vector', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    optimize_get_model(arg1: Z3_optimize): Z3_model {
        return new Z3_model(this._wasmInstance.ccall('Z3_optimize_get_model', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    optimize_get_objectives(arg1: Z3_optimize): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_optimize_get_objectives', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    optimize_get_param_descrs(arg1: Z3_optimize): Z3_param_descrs {
        return new Z3_param_descrs(this._wasmInstance.ccall('Z3_optimize_get_param_descrs', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    optimize_get_reason_unknown(arg1: Z3_optimize): string {
        return this._wasmInstance.ccall('Z3_optimize_get_reason_unknown', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    optimize_get_statistics(arg1: Z3_optimize): Z3_stats {
        return new Z3_stats(this._wasmInstance.ccall('Z3_optimize_get_statistics', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    optimize_get_upper(arg1: Z3_optimize, arg2: Uint32): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_optimize_get_upper', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    optimize_get_upper_as_vector(arg1: Z3_optimize, arg2: Uint32): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_optimize_get_upper_as_vector', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    optimize_inc_ref(arg1: Z3_optimize): void {
        this._wasmInstance.ccall('Z3_optimize_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    optimize_maximize(arg1: Z3_optimize, arg2: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_optimize_maximize', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    optimize_minimize(arg1: Z3_optimize, arg2: Z3_ast): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_optimize_minimize', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    optimize_pop(arg1: Z3_optimize): void {
        this._wasmInstance.ccall('Z3_optimize_pop', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    optimize_push(arg1: Z3_optimize): void {
        this._wasmInstance.ccall('Z3_optimize_push', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    optimize_set_params(arg1: Z3_optimize, arg2: Z3_param): void {
        this._wasmInstance.ccall('Z3_optimize_set_params', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    optimize_to_string(arg1: Z3_optimize): string {
        return this._wasmInstance.ccall('Z3_optimize_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    param_descrs_dec_ref(arg1: Z3_param_descrs): void {
        this._wasmInstance.ccall('Z3_param_descrs_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    param_descrs_get_documentation(arg1: Z3_param_descrs, arg2: Z3_symbol): string {
        return this._wasmInstance.ccall('Z3_param_descrs_get_documentation', 'string', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    param_descrs_get_kind(arg1: Z3_param_descrs, arg2: Z3_symbol): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_param_descrs_get_kind', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    param_descrs_get_name(arg1: Z3_param_descrs, arg2: Uint32): Z3_symbol {
        return new Z3_symbol(this._wasmInstance.ccall('Z3_param_descrs_get_name', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    param_descrs_inc_ref(arg1: Z3_param_descrs): void {
        this._wasmInstance.ccall('Z3_param_descrs_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    param_descrs_size(arg1: Z3_param_descrs): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_param_descrs_size', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    param_descrs_to_string(arg1: Z3_param_descrs): string {
        return this._wasmInstance.ccall('Z3_param_descrs_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    params_dec_ref(arg1: Z3_param): void {
        this._wasmInstance.ccall('Z3_params_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    params_inc_ref(arg1: Z3_param): void {
        this._wasmInstance.ccall('Z3_params_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    params_set_bool(arg1: Z3_param, arg2: Z3_symbol, arg3: Bool): void {
        this._wasmInstance.ccall('Z3_params_set_bool', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    params_set_double(arg1: Z3_param, arg2: Z3_symbol, arg3: Double): void {
        this._wasmInstance.ccall('Z3_params_set_double', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    params_set_symbol(arg1: Z3_param, arg2: Z3_symbol, arg3: Z3_symbol): void {
        this._wasmInstance.ccall('Z3_params_set_symbol', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    params_set_uint(arg1: Z3_param, arg2: Z3_symbol, arg3: Uint32): void {
        this._wasmInstance.ccall('Z3_params_set_uint', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    params_to_string(arg1: Z3_param): string {
        return this._wasmInstance.ccall('Z3_params_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    params_validate(arg1: Z3_param, arg2: Z3_param_descrs): void {
        this._wasmInstance.ccall('Z3_params_validate', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    parse_smtlib2_file(arg1: string, arg2: Uint32, arg3: Z3_symbol_arr, arg4: Z3_sort_arr, arg5: Uint32, arg6: Z3_symbol_arr, arg7: Z3_func_decl_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_parse_smtlib2_file', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]))
    }

    parse_smtlib2_string(arg1: string, arg2: Uint32, arg3: Z3_symbol_arr, arg4: Z3_sort_arr, arg5: Uint32, arg6: Z3_symbol_arr, arg7: Z3_func_decl_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_parse_smtlib2_string', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]))
    }

    parse_smtlib_file(arg1: string, arg2: Uint32, arg3: Z3_symbol_arr, arg4: Z3_sort_arr, arg5: Uint32, arg6: Z3_symbol_arr, arg7: Z3_func_decl_arr): void {
        this._wasmInstance.ccall('Z3_parse_smtlib_file', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()])
    }

    parse_smtlib_string(arg1: string, arg2: Uint32, arg3: Z3_symbol_arr, arg4: Z3_sort_arr, arg5: Uint32, arg6: Z3_symbol_arr, arg7: Z3_func_decl_arr): void {
        this._wasmInstance.ccall('Z3_parse_smtlib_string', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()])
    }

    pattern_to_ast(arg1: Z3_pattern): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_pattern_to_ast', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    pattern_to_string(arg1: Z3_pattern): string {
        return this._wasmInstance.ccall('Z3_pattern_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    polynomial_subresultants(arg1: Z3_ast, arg2: Z3_ast, arg3: Z3_ast): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_polynomial_subresultants', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    probe_and(arg1: Z3_probe, arg2: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_and', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    probe_apply(arg1: Z3_probe, arg2: Z3_goal): Double {
        return new Double(this._wasmInstance.ccall('Z3_probe_apply', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    probe_const(arg1: Double): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_const', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    probe_dec_ref(arg1: Z3_probe): void {
        this._wasmInstance.ccall('Z3_probe_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    probe_eq(arg1: Z3_probe, arg2: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_eq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    probe_ge(arg1: Z3_probe, arg2: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_ge', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    probe_get_descr(arg1: string): string {
        return this._wasmInstance.ccall('Z3_probe_get_descr', 'string', ['number', 'string'], [this._context.val(), arg1])
    }

    probe_gt(arg1: Z3_probe, arg2: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_gt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    probe_inc_ref(arg1: Z3_probe): void {
        this._wasmInstance.ccall('Z3_probe_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    probe_le(arg1: Z3_probe, arg2: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_le', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    probe_lt(arg1: Z3_probe, arg2: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_lt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    probe_not(arg1: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_not', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    probe_or(arg1: Z3_probe, arg2: Z3_probe): Z3_probe {
        return new Z3_probe(this._wasmInstance.ccall('Z3_probe_or', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    query_constructor(arg1: Z3_constructor, arg2: Uint32, arg3: Z3_func_decl_arr, arg4: Z3_func_decl_arr, arg5: Z3_func_decl_arr): void {
        this._wasmInstance.ccall('Z3_query_constructor', 'number', ['number', 'number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val()])
    }

    rcf_add(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_add', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_del(arg1: Z3_rcf_num): void {
        this._wasmInstance.ccall('Z3_rcf_del', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    rcf_div(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_div', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_eq(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_rcf_eq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_ge(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_rcf_ge', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_get_numerator_denominator(arg1: Z3_rcf_num, arg2: Z3_rcf_num_arr, arg3: Z3_rcf_num_arr): void {
        this._wasmInstance.ccall('Z3_rcf_get_numerator_denominator', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    rcf_gt(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_rcf_gt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_inv(arg1: Z3_rcf_num): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_inv', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    rcf_le(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_rcf_le', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_lt(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_rcf_lt', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_mk_e(): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_mk_e', 'number', ['number'], [this._context.val()]))
    }

    rcf_mk_infinitesimal(): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_mk_infinitesimal', 'number', ['number'], [this._context.val()]))
    }

    rcf_mk_pi(): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_mk_pi', 'number', ['number'], [this._context.val()]))
    }

    rcf_mk_rational(arg1: string): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_mk_rational', 'number', ['number', 'string'], [this._context.val(), arg1]))
    }

    rcf_mk_roots(arg1: Uint32, arg2: Z3_rcf_num_arr, arg3: Z3_rcf_num_arr): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_rcf_mk_roots', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    rcf_mk_small_int(arg1: Sint32): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_mk_small_int', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    rcf_mul(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_mul', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_neg(arg1: Z3_rcf_num): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_neg', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    rcf_neq(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_rcf_neq', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_num_to_decimal_string(arg1: Z3_rcf_num, arg2: Uint32): string {
        return this._wasmInstance.ccall('Z3_rcf_num_to_decimal_string', 'string', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    rcf_num_to_string(arg1: Z3_rcf_num, arg2: Bool, arg3: Bool): string {
        return this._wasmInstance.ccall('Z3_rcf_num_to_string', 'string', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    rcf_power(arg1: Z3_rcf_num, arg2: Uint32): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_power', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    rcf_sub(arg1: Z3_rcf_num, arg2: Z3_rcf_num): Z3_rcf_num {
        return new Z3_rcf_num(this._wasmInstance.ccall('Z3_rcf_sub', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    read_interpolation_problem(arg1: Uint32Arr, arg2: Z3_ast, arg3: Uint32, arg4: string, arg5: string_arr, arg6: Uint32Arr, arg7: Z3_ast): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_read_interpolation_problem', 'number', ['number', 'number', 'number', 'number', 'string', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4, arg5.val(), arg6.val(), arg7.val()]))
    }


    set_ast_print_mode(arg1: Uint32): void {
        this._wasmInstance.ccall('Z3_set_ast_print_mode', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    set_error(arg1: Uint32): void {
        this._wasmInstance.ccall('Z3_set_error', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }


    simplify(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_simplify', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    simplify_ex(arg1: Z3_ast, arg2: Z3_param): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_simplify_ex', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    simplify_get_help(): string {
        return this._wasmInstance.ccall('Z3_simplify_get_help', 'string', ['number'], [this._context.val()])
    }

    simplify_get_param_descrs(): Z3_param_descrs {
        return new Z3_param_descrs(this._wasmInstance.ccall('Z3_simplify_get_param_descrs', 'number', ['number'], [this._context.val()]))
    }

    solver_assert(arg1: Z3_solver, arg2: Z3_ast): void {
        this._wasmInstance.ccall('Z3_solver_assert', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    solver_assert_and_track(arg1: Z3_solver, arg2: Z3_ast, arg3: Z3_ast): void {
        this._wasmInstance.ccall('Z3_solver_assert_and_track', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()])
    }

    solver_check(arg1: Z3_solver): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_solver_check', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_check_assumptions(arg1: Z3_solver, arg2: Uint32, arg3: Z3_ast_arr): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_solver_check_assumptions', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    solver_dec_ref(arg1: Z3_solver): void {
        this._wasmInstance.ccall('Z3_solver_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    solver_get_assertions(arg1: Z3_solver): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_solver_get_assertions', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_get_consequences(arg1: Z3_solver, arg2: Z3_ast_vector, arg3: Z3_ast_vector, arg4: Z3_ast_vector): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_solver_get_consequences', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    solver_get_help(arg1: Z3_solver): string {
        return this._wasmInstance.ccall('Z3_solver_get_help', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    solver_get_model(arg1: Z3_solver): Z3_model {
        return new Z3_model(this._wasmInstance.ccall('Z3_solver_get_model', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_get_num_scopes(arg1: Z3_solver): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_solver_get_num_scopes', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_get_param_descrs(arg1: Z3_solver): Z3_param_descrs {
        return new Z3_param_descrs(this._wasmInstance.ccall('Z3_solver_get_param_descrs', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_get_proof(arg1: Z3_solver): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_solver_get_proof', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_get_reason_unknown(arg1: Z3_solver): string {
        return this._wasmInstance.ccall('Z3_solver_get_reason_unknown', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    solver_get_statistics(arg1: Z3_solver): Z3_stats {
        return new Z3_stats(this._wasmInstance.ccall('Z3_solver_get_statistics', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_get_unsat_core(arg1: Z3_solver): Z3_ast_vector {
        return new Z3_ast_vector(this._wasmInstance.ccall('Z3_solver_get_unsat_core', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    solver_inc_ref(arg1: Z3_solver): void {
        this._wasmInstance.ccall('Z3_solver_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    solver_pop(arg1: Z3_solver, arg2: Uint32): void {
        this._wasmInstance.ccall('Z3_solver_pop', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    solver_push(arg1: Z3_solver): void {
        this._wasmInstance.ccall('Z3_solver_push', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    solver_reset(arg1: Z3_solver): void {
        this._wasmInstance.ccall('Z3_solver_reset', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    solver_set_params(arg1: Z3_solver, arg2: Z3_param): void {
        this._wasmInstance.ccall('Z3_solver_set_params', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    solver_to_string(arg1: Z3_solver): string {
        return this._wasmInstance.ccall('Z3_solver_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    solver_translate(arg1: Z3_solver, arg2: Z3_context): Z3_solver {
        return new Z3_solver(this._wasmInstance.ccall('Z3_solver_translate', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    sort_to_ast(arg1: Z3_sort): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_sort_to_ast', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    sort_to_string(arg1: Z3_sort): string {
        return this._wasmInstance.ccall('Z3_sort_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    stats_dec_ref(arg1: Z3_stats): void {
        this._wasmInstance.ccall('Z3_stats_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    stats_get_double_value(arg1: Z3_stats, arg2: Uint32): Double {
        return new Double(this._wasmInstance.ccall('Z3_stats_get_double_value', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    stats_get_key(arg1: Z3_stats, arg2: Uint32): string {
        return this._wasmInstance.ccall('Z3_stats_get_key', 'string', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()])
    }

    stats_get_uint_value(arg1: Z3_stats, arg2: Uint32): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_stats_get_uint_value', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    stats_inc_ref(arg1: Z3_stats): void {
        this._wasmInstance.ccall('Z3_stats_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    stats_is_double(arg1: Z3_stats, arg2: Uint32): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_stats_is_double', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    stats_is_uint(arg1: Z3_stats, arg2: Uint32): Bool {
        return new Bool(this._wasmInstance.ccall('Z3_stats_is_uint', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    stats_size(arg1: Z3_stats): Uint32 {
        return new Uint32(this._wasmInstance.ccall('Z3_stats_size', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    stats_to_string(arg1: Z3_stats): string {
        return this._wasmInstance.ccall('Z3_stats_to_string', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    substitute(arg1: Z3_ast, arg2: Uint32, arg3: Z3_ast_arr, arg4: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_substitute', 'number', ['number', 'number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]))
    }

    substitute_vars(arg1: Z3_ast, arg2: Uint32, arg3: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_substitute_vars', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    tactic_and_then(arg1: Z3_tactic, arg2: Z3_tactic): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_and_then', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_apply(arg1: Z3_tactic, arg2: Z3_goal): Z3_apply_result {
        return new Z3_apply_result(this._wasmInstance.ccall('Z3_tactic_apply', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_apply_ex(arg1: Z3_tactic, arg2: Z3_goal, arg3: Z3_param): Z3_apply_result {
        return new Z3_apply_result(this._wasmInstance.ccall('Z3_tactic_apply_ex', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    tactic_cond(arg1: Z3_probe, arg2: Z3_tactic, arg3: Z3_tactic): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_cond', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    tactic_dec_ref(arg1: Z3_tactic): void {
        this._wasmInstance.ccall('Z3_tactic_dec_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    tactic_fail(): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_fail', 'number', ['number'], [this._context.val()]))
    }

    tactic_fail_if(arg1: Z3_probe): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_fail_if', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    tactic_fail_if_not_decided(): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_fail_if_not_decided', 'number', ['number'], [this._context.val()]))
    }

    tactic_get_descr(arg1: string): string {
        return this._wasmInstance.ccall('Z3_tactic_get_descr', 'string', ['number', 'string'], [this._context.val(), arg1])
    }

    tactic_get_help(arg1: Z3_tactic): string {
        return this._wasmInstance.ccall('Z3_tactic_get_help', 'string', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    tactic_get_param_descrs(arg1: Z3_tactic): Z3_param_descrs {
        return new Z3_param_descrs(this._wasmInstance.ccall('Z3_tactic_get_param_descrs', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    tactic_inc_ref(arg1: Z3_tactic): void {
        this._wasmInstance.ccall('Z3_tactic_inc_ref', 'number', ['number', 'number'], [this._context.val(), arg1.val()])
    }

    tactic_or_else(arg1: Z3_tactic, arg2: Z3_tactic): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_or_else', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_par_and_then(arg1: Z3_tactic, arg2: Z3_tactic): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_par_and_then', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_par_or(arg1: Uint32, arg2: Z3_tactic_arr): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_par_or', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_repeat(arg1: Z3_tactic, arg2: Uint32): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_repeat', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_skip(): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_skip', 'number', ['number'], [this._context.val()]))
    }

    tactic_try_for(arg1: Z3_tactic, arg2: Uint32): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_try_for', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_using_params(arg1: Z3_tactic, arg2: Z3_param): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_using_params', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    tactic_when(arg1: Z3_probe, arg2: Z3_tactic): Z3_tactic {
        return new Z3_tactic(this._wasmInstance.ccall('Z3_tactic_when', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    to_app(arg1: Z3_ast): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_to_app', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }

    to_func_decl(arg1: Z3_ast): Z3_func_decl {
        return new Z3_func_decl(this._wasmInstance.ccall('Z3_to_func_decl', 'number', ['number', 'number'], [this._context.val(), arg1.val()]))
    }


    translate(arg1: Z3_ast, arg2: Z3_context): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_translate', 'number', ['number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val()]))
    }

    update_param_value(arg1: string, arg2: string): void {
        this._wasmInstance.ccall('Z3_update_param_value', 'number', ['number', 'string', 'string'], [this._context.val(), arg1, arg2])
    }

    update_term(arg1: Z3_ast, arg2: Uint32, arg3: Z3_ast_arr): Z3_ast {
        return new Z3_ast(this._wasmInstance.ccall('Z3_update_term', 'number', ['number', 'number', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val()]))
    }

    write_interpolation_problem(arg1: Uint32, arg2: Z3_ast_arr, arg3: Uint32Arr, arg4: string, arg5: Uint32, arg6: Z3_ast_arr): void {
        this._wasmInstance.ccall('Z3_write_interpolation_problem', 'number', ['number', 'number', 'number', 'number', 'string', 'number', 'number'], [this._context.val(), arg1.val(), arg2.val(), arg3.val(), arg4, arg5.val(), arg6.val()])
    }

    del_context(context: Z3_context): void {
        this._wasmInstance.ccall('Z3_del_context', 'number', ['number'], [context.val()])
    }

}

export class LibZ3NonContext {

    protected readonly _wasmInstance: WasmJSInstance;

    constructor(wasmInstance: WasmJSInstance) {
        this._wasmInstance = Preconditions.checkNotUndefined(wasmInstance);
    }

    append_log(arg0: string): void {
        this._wasmInstance.ccall('Z3_append_log', 'number', ['string'], [arg0])
    }

    toggle_warning_messages(arg0: Bool): void {
        this._wasmInstance.ccall('Z3_toggle_warning_messages', 'number', ['number'], [arg0.val()])
    }

    reset_memory(): void {
        this._wasmInstance.ccall('Z3_reset_memory', 'number', [], [])
    }

    close_log(): void {
        this._wasmInstance.ccall('Z3_close_log', 'number', [], [])
    }

    open_log(arg0: string): Sint32 {
        return new Sint32(this._wasmInstance.ccall('Z3_open_log', 'number', ['string'], [arg0]))
    }

    set_param_value(arg0: Z3_config, arg1: string, arg2: string): void {
        this._wasmInstance.ccall('Z3_set_param_value', 'number', ['number', 'string', 'string'], [arg0.val(), arg1, arg2])
    }

    del_config(arg0: Z3_config): void {
        this._wasmInstance.ccall('Z3_del_config', 'number', ['number'], [arg0.val()])
    }

    get_full_version(): string {
        return this._wasmInstance.ccall('Z3_get_full_version', 'string', [], [])
    }

    get_estimated_alloc_size(): Uint64 {
        return new Uint64(this._wasmInstance.ccall('Z3_get_estimated_alloc_size', 'number', [], []))
    }

    mk_config(): Z3_config {
        return new Z3_config(this._wasmInstance.ccall('Z3_mk_config', 'number', [], []))
    }

    disable_trace(arg0: string): void {
        this._wasmInstance.ccall('Z3_disable_trace', 'number', ['string'], [arg0])
    }

    enable_trace(arg0: string): void {
        this._wasmInstance.ccall('Z3_enable_trace', 'number', ['string'], [arg0])
    }

    finalize_memory(): void {
        this._wasmInstance.ccall('Z3_finalize_memory', 'number', [], [])
    }

    del_context(context: Z3_context): void {
        this._wasmInstance.ccall('Z3_del_context', 'number', ['number'], [context.val()])
    }

    global_param_set(arg0: string, arg1: string): void {
        this._wasmInstance.ccall('Z3_global_param_set', 'number', ['string', 'string'], [arg0, arg1])
    }

    mk_context(arg0: Z3_config): Z3_context {
      return new Z3_context(this._wasmInstance.ccall('Z3_mk_context', 'number', ['number'], [arg0.val()]))
    }

    mk_context_rc(arg0: Z3_config): Z3_context {
        return new Z3_context(this._wasmInstance.ccall('Z3_mk_context_rc', 'number', ['number'], [arg0.val()]))
    }

    mk_interpolation_context(arg0: Z3_config): Z3_context {
        return new Z3_context(this._wasmInstance.ccall('Z3_mk_interpolation_context', 'number', ['number'], [arg0.val()]));
    }



}
