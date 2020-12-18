# Tim's Advent of Code 2020 solutions

Uses a nodejs script to import each solution as a module and run it on the input:  
`node run <day> [<part>] [<repeat>]`
```
PS D:\Stuff\aoc-2020> node run 18 1 1000
Part 1: 0.000922s
800602729153
```
The answer for the part is given on the latter line.

Leaving out `part` runs both parts for the day.  
Including a `repeat` count over 2 (1 and 2 would parse as `part` if `part` isn't given) runs the code multiple times and averages the runtime.  
```
PS D:\Stuff\aoc-2020> node run 18 1000
Part 1: 0.000884s
800602729153
Part 2: 0.001632s
92173009047076
```

The first commit for each day is the actual solutions I used for that day.
Often I add later commits to neaten or speed up the code, or to try a different method -
if I don't, it's because I didn't bother, not out of any specific lack :)
