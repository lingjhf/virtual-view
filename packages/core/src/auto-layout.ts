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

abstract class Graph {
  x = 0
  y = 0
  width = 0
  height = 0

  leftPadding = 0
  topPadding = 0
  bottomPadding = 0
  rightPadding = 0
}

abstract class Flex extends Graph {
  align: FlexAlign = FlexAlign.topLeft

  children: Flex[] = []

  add(child: Flex) {

  }

  remove() {

  }

  setPadding(padding: { left: number, top: number, bottom: number, right: number, }) {
    
  }
}

class Column extends Flex {

}

class Row extends Flex {

}

class Container extends Graph {

}
