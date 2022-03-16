// def insertLeft x y alist do
//   case alist do
//     when [] do [] end
//     when [z, zs] do
//       if y is z do [x, alist]
//       else [z, insertLeft x y zs]
//       end
//     end
//   end
// end

import types from "next/types"
import {of,call} from "parsimmon"
import {List,Nothing,Left,Right,Maybe} from "purify-ts"
import {is,either,or,pair,and,insert,count,cond,when,otherwise,not,sum,product,without,find} from "ramda"

a list is either nothing or a pair of something and a list of that something


## Data constructors
v
A List OF x IS
  EITHER  Nothing
  OR      Pair OF x
            AND List OF x

v
A Tree OF x IS
  EITHER    Leaf
  OR        Branch OF x
              AND Tree OF x
              AND Tree OF x

A Tree OF x IS
  EITHER    Leaf
  OR        Branch OF x
              AND Left
              AND Right
  WHERE Left  IS Tree OF x
    and Right IS Tree OF x

v
A Tree OF x IS
  EITHER Leaf
  OR     Branch OF...
           Value x
           Left Tree OF x
           Right Tree OF x

A Color IS
  EITHER   Red
  OR       Blue
  OR       Green


DEFINE insert_left AS A FUNCTION
  TAKING
    a value to look for NAMED x
    a value to insert   NAMED y
    a list              NAMED alist
  RETURNING
    WHEN alist IS
      Nothing -> Nothing
      Pair z zs ->
        WHEN x IS z THEN y:x:zs
        OTHERWISE insert_left x y zs

DEFINE insert_left AS A FUNCTION
  TAKING
    a value to look for NAMED x
    a value to insert   NAMED y
    a list              NAMED alist
  RETURNING
    Nothing             WHEN alist IS Nothing
    y:x:zs              WHEN alist IS Pair z zs
                          AND x IS z
    insert_left x y zs  OTHERWISE

DEFINE length AS A FUNCTION
  TAKING
    a list  NAMED alist
  RETURNING
    0             WHEN alist IS Nothing
    1 + length xs WHEN alist IS x:xs

DEFINE length AS A FUNCTION
  TAKING
    a list NAMED alist
  RETURNING
    WHEN alist IS Nothing -> 0
    WHEN alist IS x:xs -> 1 + length xs

DEFINE length AS A SYNONYM FOR
  helper 0

  WHERE
    helper IS A FUNCTION
      TAKING
        a count NAMED count
        a list  NAMED alist
      RETURNING
        WHEN alist IS Nothing -> count
        WHEN alist IS x:xs    -> helper xs (count + 1)

DEFINE length AS A FUNCTION
  TAKING
    a list NAMED alist
  RETURNING
    helper 0 alist
  WHERE
    helper IS A FUNCTION
      TAKING
        a count NAMED count
        a list  NAMED alist
      RETURNING
        WHEN alist IS Nothing -> count
        WHEN alist IS x:xs    -> helper xs (count + 1)



* define
  * word
  * function
* Branch
  * decide (cond) ??
  * when :: bool expr -> expr
  * otherwise :: expr
* Compare
  * is :: a -> b -> bool
  * isnt :: a -> b -> bool
  * not :: bool -> bool
  * and :: bool -> bool -> bool
  * or :: bool -> bool -> bool
* Functions
  * call
* Data
  * A/An
  * sum types
  * product types

<!-- Maybe code without booleans? find some way to represent conds like
completed? incomplete? in terms of the structure, not returning a bool? -->

// list         number
// ----> <word> ---->
// <word> {<argument>} =
//   match <expr>
//     case


/*
Old ideas

# Instructions
* function
  * define
    * parameters
  * call
    * arguments
  * recursion -> call fn with new args
* control flow
  * if/else
  * match / case

# Environment
* pair
  * head
  * tail
*/


  insert_left
  --in---|-------------------------------------------out---
  |alist |                                         |      |
>-|-------when alist is                            |      |
>-|x      ()---------> () ----------------------------o----->
>-|y      (z)-(zs) --> when x is z --> (y)-(x)-(zs)---|   |
  |                 |- otherwise insert_left x y zs       |
  --------------------------------------------------------|
