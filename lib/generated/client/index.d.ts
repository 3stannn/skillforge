
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model GeneratedSkill
 * 
 */
export type GeneratedSkill = $Result.DefaultSelection<Prisma.$GeneratedSkillPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more GeneratedSkills
 * const generatedSkills = await prisma.generatedSkill.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more GeneratedSkills
   * const generatedSkills = await prisma.generatedSkill.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.generatedSkill`: Exposes CRUD operations for the **GeneratedSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneratedSkills
    * const generatedSkills = await prisma.generatedSkill.findMany()
    * ```
    */
  get generatedSkill(): Prisma.GeneratedSkillDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    GeneratedSkill: 'GeneratedSkill'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "generatedSkill"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GeneratedSkill: {
        payload: Prisma.$GeneratedSkillPayload<ExtArgs>
        fields: Prisma.GeneratedSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneratedSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneratedSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>
          }
          findFirst: {
            args: Prisma.GeneratedSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneratedSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>
          }
          findMany: {
            args: Prisma.GeneratedSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>[]
          }
          create: {
            args: Prisma.GeneratedSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>
          }
          createMany: {
            args: Prisma.GeneratedSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeneratedSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>[]
          }
          delete: {
            args: Prisma.GeneratedSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>
          }
          update: {
            args: Prisma.GeneratedSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>
          }
          deleteMany: {
            args: Prisma.GeneratedSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneratedSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GeneratedSkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>[]
          }
          upsert: {
            args: Prisma.GeneratedSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedSkillPayload>
          }
          aggregate: {
            args: Prisma.GeneratedSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneratedSkill>
          }
          groupBy: {
            args: Prisma.GeneratedSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneratedSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneratedSkillCountArgs<ExtArgs>
            result: $Utils.Optional<GeneratedSkillCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    generatedSkill?: GeneratedSkillOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model GeneratedSkill
   */

  export type AggregateGeneratedSkill = {
    _count: GeneratedSkillCountAggregateOutputType | null
    _min: GeneratedSkillMinAggregateOutputType | null
    _max: GeneratedSkillMaxAggregateOutputType | null
  }

  export type GeneratedSkillMinAggregateOutputType = {
    id: string | null
    url: string | null
    title: string | null
    skillName: string | null
    description: string | null
    skillMd: string | null
    componentCode: string | null
    stylesJson: string | null
    logicJson: string | null
    promptsJson: string | null
    markdownSnippet: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeneratedSkillMaxAggregateOutputType = {
    id: string | null
    url: string | null
    title: string | null
    skillName: string | null
    description: string | null
    skillMd: string | null
    componentCode: string | null
    stylesJson: string | null
    logicJson: string | null
    promptsJson: string | null
    markdownSnippet: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeneratedSkillCountAggregateOutputType = {
    id: number
    url: number
    title: number
    skillName: number
    description: number
    skillMd: number
    componentCode: number
    stylesJson: number
    logicJson: number
    promptsJson: number
    markdownSnippet: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GeneratedSkillMinAggregateInputType = {
    id?: true
    url?: true
    title?: true
    skillName?: true
    description?: true
    skillMd?: true
    componentCode?: true
    stylesJson?: true
    logicJson?: true
    promptsJson?: true
    markdownSnippet?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeneratedSkillMaxAggregateInputType = {
    id?: true
    url?: true
    title?: true
    skillName?: true
    description?: true
    skillMd?: true
    componentCode?: true
    stylesJson?: true
    logicJson?: true
    promptsJson?: true
    markdownSnippet?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeneratedSkillCountAggregateInputType = {
    id?: true
    url?: true
    title?: true
    skillName?: true
    description?: true
    skillMd?: true
    componentCode?: true
    stylesJson?: true
    logicJson?: true
    promptsJson?: true
    markdownSnippet?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GeneratedSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedSkill to aggregate.
     */
    where?: GeneratedSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedSkills to fetch.
     */
    orderBy?: GeneratedSkillOrderByWithRelationInput | GeneratedSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneratedSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneratedSkills
    **/
    _count?: true | GeneratedSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneratedSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneratedSkillMaxAggregateInputType
  }

  export type GetGeneratedSkillAggregateType<T extends GeneratedSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneratedSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneratedSkill[P]>
      : GetScalarType<T[P], AggregateGeneratedSkill[P]>
  }




  export type GeneratedSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedSkillWhereInput
    orderBy?: GeneratedSkillOrderByWithAggregationInput | GeneratedSkillOrderByWithAggregationInput[]
    by: GeneratedSkillScalarFieldEnum[] | GeneratedSkillScalarFieldEnum
    having?: GeneratedSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneratedSkillCountAggregateInputType | true
    _min?: GeneratedSkillMinAggregateInputType
    _max?: GeneratedSkillMaxAggregateInputType
  }

  export type GeneratedSkillGroupByOutputType = {
    id: string
    url: string
    title: string | null
    skillName: string
    description: string
    skillMd: string
    componentCode: string
    stylesJson: string
    logicJson: string
    promptsJson: string
    markdownSnippet: string | null
    createdAt: Date
    updatedAt: Date
    _count: GeneratedSkillCountAggregateOutputType | null
    _min: GeneratedSkillMinAggregateOutputType | null
    _max: GeneratedSkillMaxAggregateOutputType | null
  }

  type GetGeneratedSkillGroupByPayload<T extends GeneratedSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneratedSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneratedSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneratedSkillGroupByOutputType[P]>
            : GetScalarType<T[P], GeneratedSkillGroupByOutputType[P]>
        }
      >
    >


  export type GeneratedSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    skillName?: boolean
    description?: boolean
    skillMd?: boolean
    componentCode?: boolean
    stylesJson?: boolean
    logicJson?: boolean
    promptsJson?: boolean
    markdownSnippet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["generatedSkill"]>

  export type GeneratedSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    skillName?: boolean
    description?: boolean
    skillMd?: boolean
    componentCode?: boolean
    stylesJson?: boolean
    logicJson?: boolean
    promptsJson?: boolean
    markdownSnippet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["generatedSkill"]>

  export type GeneratedSkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    skillName?: boolean
    description?: boolean
    skillMd?: boolean
    componentCode?: boolean
    stylesJson?: boolean
    logicJson?: boolean
    promptsJson?: boolean
    markdownSnippet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["generatedSkill"]>

  export type GeneratedSkillSelectScalar = {
    id?: boolean
    url?: boolean
    title?: boolean
    skillName?: boolean
    description?: boolean
    skillMd?: boolean
    componentCode?: boolean
    stylesJson?: boolean
    logicJson?: boolean
    promptsJson?: boolean
    markdownSnippet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GeneratedSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "title" | "skillName" | "description" | "skillMd" | "componentCode" | "stylesJson" | "logicJson" | "promptsJson" | "markdownSnippet" | "createdAt" | "updatedAt", ExtArgs["result"]["generatedSkill"]>

  export type $GeneratedSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneratedSkill"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      title: string | null
      skillName: string
      description: string
      skillMd: string
      componentCode: string
      stylesJson: string
      logicJson: string
      promptsJson: string
      markdownSnippet: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["generatedSkill"]>
    composites: {}
  }

  type GeneratedSkillGetPayload<S extends boolean | null | undefined | GeneratedSkillDefaultArgs> = $Result.GetResult<Prisma.$GeneratedSkillPayload, S>

  type GeneratedSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneratedSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneratedSkillCountAggregateInputType | true
    }

  export interface GeneratedSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneratedSkill'], meta: { name: 'GeneratedSkill' } }
    /**
     * Find zero or one GeneratedSkill that matches the filter.
     * @param {GeneratedSkillFindUniqueArgs} args - Arguments to find a GeneratedSkill
     * @example
     * // Get one GeneratedSkill
     * const generatedSkill = await prisma.generatedSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneratedSkillFindUniqueArgs>(args: SelectSubset<T, GeneratedSkillFindUniqueArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneratedSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneratedSkillFindUniqueOrThrowArgs} args - Arguments to find a GeneratedSkill
     * @example
     * // Get one GeneratedSkill
     * const generatedSkill = await prisma.generatedSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneratedSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneratedSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedSkillFindFirstArgs} args - Arguments to find a GeneratedSkill
     * @example
     * // Get one GeneratedSkill
     * const generatedSkill = await prisma.generatedSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneratedSkillFindFirstArgs>(args?: SelectSubset<T, GeneratedSkillFindFirstArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedSkillFindFirstOrThrowArgs} args - Arguments to find a GeneratedSkill
     * @example
     * // Get one GeneratedSkill
     * const generatedSkill = await prisma.generatedSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneratedSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneratedSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneratedSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneratedSkills
     * const generatedSkills = await prisma.generatedSkill.findMany()
     * 
     * // Get first 10 GeneratedSkills
     * const generatedSkills = await prisma.generatedSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generatedSkillWithIdOnly = await prisma.generatedSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneratedSkillFindManyArgs>(args?: SelectSubset<T, GeneratedSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneratedSkill.
     * @param {GeneratedSkillCreateArgs} args - Arguments to create a GeneratedSkill.
     * @example
     * // Create one GeneratedSkill
     * const GeneratedSkill = await prisma.generatedSkill.create({
     *   data: {
     *     // ... data to create a GeneratedSkill
     *   }
     * })
     * 
     */
    create<T extends GeneratedSkillCreateArgs>(args: SelectSubset<T, GeneratedSkillCreateArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneratedSkills.
     * @param {GeneratedSkillCreateManyArgs} args - Arguments to create many GeneratedSkills.
     * @example
     * // Create many GeneratedSkills
     * const generatedSkill = await prisma.generatedSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneratedSkillCreateManyArgs>(args?: SelectSubset<T, GeneratedSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeneratedSkills and returns the data saved in the database.
     * @param {GeneratedSkillCreateManyAndReturnArgs} args - Arguments to create many GeneratedSkills.
     * @example
     * // Create many GeneratedSkills
     * const generatedSkill = await prisma.generatedSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeneratedSkills and only return the `id`
     * const generatedSkillWithIdOnly = await prisma.generatedSkill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeneratedSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, GeneratedSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeneratedSkill.
     * @param {GeneratedSkillDeleteArgs} args - Arguments to delete one GeneratedSkill.
     * @example
     * // Delete one GeneratedSkill
     * const GeneratedSkill = await prisma.generatedSkill.delete({
     *   where: {
     *     // ... filter to delete one GeneratedSkill
     *   }
     * })
     * 
     */
    delete<T extends GeneratedSkillDeleteArgs>(args: SelectSubset<T, GeneratedSkillDeleteArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneratedSkill.
     * @param {GeneratedSkillUpdateArgs} args - Arguments to update one GeneratedSkill.
     * @example
     * // Update one GeneratedSkill
     * const generatedSkill = await prisma.generatedSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneratedSkillUpdateArgs>(args: SelectSubset<T, GeneratedSkillUpdateArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneratedSkills.
     * @param {GeneratedSkillDeleteManyArgs} args - Arguments to filter GeneratedSkills to delete.
     * @example
     * // Delete a few GeneratedSkills
     * const { count } = await prisma.generatedSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneratedSkillDeleteManyArgs>(args?: SelectSubset<T, GeneratedSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneratedSkills
     * const generatedSkill = await prisma.generatedSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneratedSkillUpdateManyArgs>(args: SelectSubset<T, GeneratedSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedSkills and returns the data updated in the database.
     * @param {GeneratedSkillUpdateManyAndReturnArgs} args - Arguments to update many GeneratedSkills.
     * @example
     * // Update many GeneratedSkills
     * const generatedSkill = await prisma.generatedSkill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GeneratedSkills and only return the `id`
     * const generatedSkillWithIdOnly = await prisma.generatedSkill.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GeneratedSkillUpdateManyAndReturnArgs>(args: SelectSubset<T, GeneratedSkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GeneratedSkill.
     * @param {GeneratedSkillUpsertArgs} args - Arguments to update or create a GeneratedSkill.
     * @example
     * // Update or create a GeneratedSkill
     * const generatedSkill = await prisma.generatedSkill.upsert({
     *   create: {
     *     // ... data to create a GeneratedSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneratedSkill we want to update
     *   }
     * })
     */
    upsert<T extends GeneratedSkillUpsertArgs>(args: SelectSubset<T, GeneratedSkillUpsertArgs<ExtArgs>>): Prisma__GeneratedSkillClient<$Result.GetResult<Prisma.$GeneratedSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneratedSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedSkillCountArgs} args - Arguments to filter GeneratedSkills to count.
     * @example
     * // Count the number of GeneratedSkills
     * const count = await prisma.generatedSkill.count({
     *   where: {
     *     // ... the filter for the GeneratedSkills we want to count
     *   }
     * })
    **/
    count<T extends GeneratedSkillCountArgs>(
      args?: Subset<T, GeneratedSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneratedSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneratedSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeneratedSkillAggregateArgs>(args: Subset<T, GeneratedSkillAggregateArgs>): Prisma.PrismaPromise<GetGeneratedSkillAggregateType<T>>

    /**
     * Group by GeneratedSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeneratedSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneratedSkillGroupByArgs['orderBy'] }
        : { orderBy?: GeneratedSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeneratedSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneratedSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneratedSkill model
   */
  readonly fields: GeneratedSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneratedSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneratedSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeneratedSkill model
   */
  interface GeneratedSkillFieldRefs {
    readonly id: FieldRef<"GeneratedSkill", 'String'>
    readonly url: FieldRef<"GeneratedSkill", 'String'>
    readonly title: FieldRef<"GeneratedSkill", 'String'>
    readonly skillName: FieldRef<"GeneratedSkill", 'String'>
    readonly description: FieldRef<"GeneratedSkill", 'String'>
    readonly skillMd: FieldRef<"GeneratedSkill", 'String'>
    readonly componentCode: FieldRef<"GeneratedSkill", 'String'>
    readonly stylesJson: FieldRef<"GeneratedSkill", 'String'>
    readonly logicJson: FieldRef<"GeneratedSkill", 'String'>
    readonly promptsJson: FieldRef<"GeneratedSkill", 'String'>
    readonly markdownSnippet: FieldRef<"GeneratedSkill", 'String'>
    readonly createdAt: FieldRef<"GeneratedSkill", 'DateTime'>
    readonly updatedAt: FieldRef<"GeneratedSkill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeneratedSkill findUnique
   */
  export type GeneratedSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedSkill to fetch.
     */
    where: GeneratedSkillWhereUniqueInput
  }

  /**
   * GeneratedSkill findUniqueOrThrow
   */
  export type GeneratedSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedSkill to fetch.
     */
    where: GeneratedSkillWhereUniqueInput
  }

  /**
   * GeneratedSkill findFirst
   */
  export type GeneratedSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedSkill to fetch.
     */
    where?: GeneratedSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedSkills to fetch.
     */
    orderBy?: GeneratedSkillOrderByWithRelationInput | GeneratedSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedSkills.
     */
    cursor?: GeneratedSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedSkills.
     */
    distinct?: GeneratedSkillScalarFieldEnum | GeneratedSkillScalarFieldEnum[]
  }

  /**
   * GeneratedSkill findFirstOrThrow
   */
  export type GeneratedSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedSkill to fetch.
     */
    where?: GeneratedSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedSkills to fetch.
     */
    orderBy?: GeneratedSkillOrderByWithRelationInput | GeneratedSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedSkills.
     */
    cursor?: GeneratedSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedSkills.
     */
    distinct?: GeneratedSkillScalarFieldEnum | GeneratedSkillScalarFieldEnum[]
  }

  /**
   * GeneratedSkill findMany
   */
  export type GeneratedSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * Filter, which GeneratedSkills to fetch.
     */
    where?: GeneratedSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedSkills to fetch.
     */
    orderBy?: GeneratedSkillOrderByWithRelationInput | GeneratedSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneratedSkills.
     */
    cursor?: GeneratedSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedSkills.
     */
    skip?: number
    distinct?: GeneratedSkillScalarFieldEnum | GeneratedSkillScalarFieldEnum[]
  }

  /**
   * GeneratedSkill create
   */
  export type GeneratedSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * The data needed to create a GeneratedSkill.
     */
    data: XOR<GeneratedSkillCreateInput, GeneratedSkillUncheckedCreateInput>
  }

  /**
   * GeneratedSkill createMany
   */
  export type GeneratedSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneratedSkills.
     */
    data: GeneratedSkillCreateManyInput | GeneratedSkillCreateManyInput[]
  }

  /**
   * GeneratedSkill createManyAndReturn
   */
  export type GeneratedSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * The data used to create many GeneratedSkills.
     */
    data: GeneratedSkillCreateManyInput | GeneratedSkillCreateManyInput[]
  }

  /**
   * GeneratedSkill update
   */
  export type GeneratedSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * The data needed to update a GeneratedSkill.
     */
    data: XOR<GeneratedSkillUpdateInput, GeneratedSkillUncheckedUpdateInput>
    /**
     * Choose, which GeneratedSkill to update.
     */
    where: GeneratedSkillWhereUniqueInput
  }

  /**
   * GeneratedSkill updateMany
   */
  export type GeneratedSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneratedSkills.
     */
    data: XOR<GeneratedSkillUpdateManyMutationInput, GeneratedSkillUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedSkills to update
     */
    where?: GeneratedSkillWhereInput
    /**
     * Limit how many GeneratedSkills to update.
     */
    limit?: number
  }

  /**
   * GeneratedSkill updateManyAndReturn
   */
  export type GeneratedSkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * The data used to update GeneratedSkills.
     */
    data: XOR<GeneratedSkillUpdateManyMutationInput, GeneratedSkillUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedSkills to update
     */
    where?: GeneratedSkillWhereInput
    /**
     * Limit how many GeneratedSkills to update.
     */
    limit?: number
  }

  /**
   * GeneratedSkill upsert
   */
  export type GeneratedSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * The filter to search for the GeneratedSkill to update in case it exists.
     */
    where: GeneratedSkillWhereUniqueInput
    /**
     * In case the GeneratedSkill found by the `where` argument doesn't exist, create a new GeneratedSkill with this data.
     */
    create: XOR<GeneratedSkillCreateInput, GeneratedSkillUncheckedCreateInput>
    /**
     * In case the GeneratedSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneratedSkillUpdateInput, GeneratedSkillUncheckedUpdateInput>
  }

  /**
   * GeneratedSkill delete
   */
  export type GeneratedSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
    /**
     * Filter which GeneratedSkill to delete.
     */
    where: GeneratedSkillWhereUniqueInput
  }

  /**
   * GeneratedSkill deleteMany
   */
  export type GeneratedSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedSkills to delete
     */
    where?: GeneratedSkillWhereInput
    /**
     * Limit how many GeneratedSkills to delete.
     */
    limit?: number
  }

  /**
   * GeneratedSkill without action
   */
  export type GeneratedSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedSkill
     */
    select?: GeneratedSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedSkill
     */
    omit?: GeneratedSkillOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GeneratedSkillScalarFieldEnum: {
    id: 'id',
    url: 'url',
    title: 'title',
    skillName: 'skillName',
    description: 'description',
    skillMd: 'skillMd',
    componentCode: 'componentCode',
    stylesJson: 'stylesJson',
    logicJson: 'logicJson',
    promptsJson: 'promptsJson',
    markdownSnippet: 'markdownSnippet',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GeneratedSkillScalarFieldEnum = (typeof GeneratedSkillScalarFieldEnum)[keyof typeof GeneratedSkillScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type GeneratedSkillWhereInput = {
    AND?: GeneratedSkillWhereInput | GeneratedSkillWhereInput[]
    OR?: GeneratedSkillWhereInput[]
    NOT?: GeneratedSkillWhereInput | GeneratedSkillWhereInput[]
    id?: StringFilter<"GeneratedSkill"> | string
    url?: StringFilter<"GeneratedSkill"> | string
    title?: StringNullableFilter<"GeneratedSkill"> | string | null
    skillName?: StringFilter<"GeneratedSkill"> | string
    description?: StringFilter<"GeneratedSkill"> | string
    skillMd?: StringFilter<"GeneratedSkill"> | string
    componentCode?: StringFilter<"GeneratedSkill"> | string
    stylesJson?: StringFilter<"GeneratedSkill"> | string
    logicJson?: StringFilter<"GeneratedSkill"> | string
    promptsJson?: StringFilter<"GeneratedSkill"> | string
    markdownSnippet?: StringNullableFilter<"GeneratedSkill"> | string | null
    createdAt?: DateTimeFilter<"GeneratedSkill"> | Date | string
    updatedAt?: DateTimeFilter<"GeneratedSkill"> | Date | string
  }

  export type GeneratedSkillOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    skillName?: SortOrder
    description?: SortOrder
    skillMd?: SortOrder
    componentCode?: SortOrder
    stylesJson?: SortOrder
    logicJson?: SortOrder
    promptsJson?: SortOrder
    markdownSnippet?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeneratedSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GeneratedSkillWhereInput | GeneratedSkillWhereInput[]
    OR?: GeneratedSkillWhereInput[]
    NOT?: GeneratedSkillWhereInput | GeneratedSkillWhereInput[]
    url?: StringFilter<"GeneratedSkill"> | string
    title?: StringNullableFilter<"GeneratedSkill"> | string | null
    skillName?: StringFilter<"GeneratedSkill"> | string
    description?: StringFilter<"GeneratedSkill"> | string
    skillMd?: StringFilter<"GeneratedSkill"> | string
    componentCode?: StringFilter<"GeneratedSkill"> | string
    stylesJson?: StringFilter<"GeneratedSkill"> | string
    logicJson?: StringFilter<"GeneratedSkill"> | string
    promptsJson?: StringFilter<"GeneratedSkill"> | string
    markdownSnippet?: StringNullableFilter<"GeneratedSkill"> | string | null
    createdAt?: DateTimeFilter<"GeneratedSkill"> | Date | string
    updatedAt?: DateTimeFilter<"GeneratedSkill"> | Date | string
  }, "id">

  export type GeneratedSkillOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    skillName?: SortOrder
    description?: SortOrder
    skillMd?: SortOrder
    componentCode?: SortOrder
    stylesJson?: SortOrder
    logicJson?: SortOrder
    promptsJson?: SortOrder
    markdownSnippet?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GeneratedSkillCountOrderByAggregateInput
    _max?: GeneratedSkillMaxOrderByAggregateInput
    _min?: GeneratedSkillMinOrderByAggregateInput
  }

  export type GeneratedSkillScalarWhereWithAggregatesInput = {
    AND?: GeneratedSkillScalarWhereWithAggregatesInput | GeneratedSkillScalarWhereWithAggregatesInput[]
    OR?: GeneratedSkillScalarWhereWithAggregatesInput[]
    NOT?: GeneratedSkillScalarWhereWithAggregatesInput | GeneratedSkillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    url?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    title?: StringNullableWithAggregatesFilter<"GeneratedSkill"> | string | null
    skillName?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    description?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    skillMd?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    componentCode?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    stylesJson?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    logicJson?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    promptsJson?: StringWithAggregatesFilter<"GeneratedSkill"> | string
    markdownSnippet?: StringNullableWithAggregatesFilter<"GeneratedSkill"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GeneratedSkill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GeneratedSkill"> | Date | string
  }

  export type GeneratedSkillCreateInput = {
    id?: string
    url: string
    title?: string | null
    skillName: string
    description: string
    skillMd: string
    componentCode: string
    stylesJson: string
    logicJson: string
    promptsJson: string
    markdownSnippet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeneratedSkillUncheckedCreateInput = {
    id?: string
    url: string
    title?: string | null
    skillName: string
    description: string
    skillMd: string
    componentCode: string
    stylesJson: string
    logicJson: string
    promptsJson: string
    markdownSnippet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeneratedSkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    skillName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    skillMd?: StringFieldUpdateOperationsInput | string
    componentCode?: StringFieldUpdateOperationsInput | string
    stylesJson?: StringFieldUpdateOperationsInput | string
    logicJson?: StringFieldUpdateOperationsInput | string
    promptsJson?: StringFieldUpdateOperationsInput | string
    markdownSnippet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedSkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    skillName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    skillMd?: StringFieldUpdateOperationsInput | string
    componentCode?: StringFieldUpdateOperationsInput | string
    stylesJson?: StringFieldUpdateOperationsInput | string
    logicJson?: StringFieldUpdateOperationsInput | string
    promptsJson?: StringFieldUpdateOperationsInput | string
    markdownSnippet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedSkillCreateManyInput = {
    id?: string
    url: string
    title?: string | null
    skillName: string
    description: string
    skillMd: string
    componentCode: string
    stylesJson: string
    logicJson: string
    promptsJson: string
    markdownSnippet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeneratedSkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    skillName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    skillMd?: StringFieldUpdateOperationsInput | string
    componentCode?: StringFieldUpdateOperationsInput | string
    stylesJson?: StringFieldUpdateOperationsInput | string
    logicJson?: StringFieldUpdateOperationsInput | string
    promptsJson?: StringFieldUpdateOperationsInput | string
    markdownSnippet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedSkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    skillName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    skillMd?: StringFieldUpdateOperationsInput | string
    componentCode?: StringFieldUpdateOperationsInput | string
    stylesJson?: StringFieldUpdateOperationsInput | string
    logicJson?: StringFieldUpdateOperationsInput | string
    promptsJson?: StringFieldUpdateOperationsInput | string
    markdownSnippet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GeneratedSkillCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    skillName?: SortOrder
    description?: SortOrder
    skillMd?: SortOrder
    componentCode?: SortOrder
    stylesJson?: SortOrder
    logicJson?: SortOrder
    promptsJson?: SortOrder
    markdownSnippet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeneratedSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    skillName?: SortOrder
    description?: SortOrder
    skillMd?: SortOrder
    componentCode?: SortOrder
    stylesJson?: SortOrder
    logicJson?: SortOrder
    promptsJson?: SortOrder
    markdownSnippet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeneratedSkillMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    skillName?: SortOrder
    description?: SortOrder
    skillMd?: SortOrder
    componentCode?: SortOrder
    stylesJson?: SortOrder
    logicJson?: SortOrder
    promptsJson?: SortOrder
    markdownSnippet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}