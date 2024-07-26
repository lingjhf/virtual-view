abstract class Graph {
  x = 0
  y = 0
  width = 0
  height = 0
}

enum FlexAlign {
  bottomCenter,
  bottomLeft,
  bottomRight,
  center,
  centerLeft,
  centerRight,
  topCenter,
  topLeft,
  topRight,
}

abstract class Flex extends Graph {
  align: FlexAlign = FlexAlign.topLeft

  children: Flex[] = []

  add() {

  }

  remove() {

  }
}

class Column extends Flex {

}

class Row extends Flex {

}

class Container extends Graph {

}
