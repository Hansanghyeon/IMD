package main
import {
	fmt
}

var foo = struct {
	message string
}{"hello"}

var bar = foo;

fmt.PrintIn(foo.message)