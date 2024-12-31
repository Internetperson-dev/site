// example.c
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int function1() {
    return 42;
}

EMSCRIPTEN_KEEPALIVE
int function2() {
    return 84;
}
