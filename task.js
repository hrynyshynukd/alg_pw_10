// Реалізація двобічно зв’язаного списку

// Вузол (Node)
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// Двобічно зв’язаний список
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Додати елемент в початок
    addFirst(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    // Додати елемент в кінець
    addLast(value) {
        const newNode = new Node(value);

        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    // Видалити перший елемент
    removeFirst() {
        if (!this.head) return null;

        const value = this.head.value;

        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }

        this.length--;
        return value;
    }

    // Видалити останній елемент
    removeLast() {
        if (!this.tail) return null;

        const value = this.tail.value;

        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

        this.length--;
        return value;
    }

    // Перевірити наявність елементу
    contains(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }

    // Отримати елемент за індексом
    getByIndex(index) {
        if (index < 0 || index >= this.length) return null;

        let current;
        let i;

        if (index < this.length / 2) {
            current = this.head;
            i = 0;
            while (i < index) {
                current = current.next;
                i++;
            }
        } else {
            current = this.tail;
            i = this.length - 1;
            while (i > index) {
                current = current.prev;
                i--;
            }
        }
        return current.value;
    }

    // Вставити елемент за індексом
    insertAt(index, value) {
        if (index < 0 || index > this.length) return false;

        if (index === 0) {
            this.addFirst(value);
            return true;
        }

        if (index === this.length) {
            this.addLast(value);
            return true;
        }

        const newNode = new Node(value);
        let current = this.head;
        let i = 0;

        while (i < index) {
            current = current.next;
            i++;
        }

        newNode.prev = current.prev;
        newNode.next = current;

        current.prev.next = newNode;
        current.prev = newNode;

        this.length++;
        return true;
    }

    // Видалити елемент за індексом
    removeAt(index) {
        if (index < 0 || index >= this.length) return null;

        if (index === 0) return this.removeFirst();
        if (index === this.length - 1) return this.removeLast();

        let current = this.head;
        let i = 0;

        while (i < index) {
            current = current.next;
            i++;
        }

        const value = current.value;

        current.prev.next = current.next;
        current.next.prev = current.prev;

        this.length--;
        return value;
    }

    // Повернути найбільший елемент
    getMax() {
        if (!this.head) return null;

        let max = this.head.value;
        let current = this.head.next;

        while (current) {
            if (current.value > max) max = current.value;
            current = current.next;
        }

        return max;
    }

    // Повернути найменший елемент
    getMin() {
        if (!this.head) return null;

        let min = this.head.value;
        let current = this.head.next;

        while (current) {
            if (current.value < min) min = current.value;
            current = current.next;
        }

        return min;
    }

    // Розмір списку
    size() {
        return this.length;
    }

    // Форматований вивід
    toString() {
        let result = "{";
        let current = this.head;
        let index = 0;

        while (current) {
            result += `[index:${index}; value:${current.value}]`;
            if (current.next) result += " ";
            current = current.next;
            index++;
        }

        result += "}";
        return result;
    }

    // Додати масив за індексом
    insertArrayAt(index, array) {
        if (index < 0 || index > this.length) return false;
        for (let i = 0; i < array.length; i++) {
            this.insertAt(index + i, array[i]);
        }
        return true;
    }
}


//

console.log("Демонстрація роботи двобічно зв’язаного списку\n");

const list = new DoublyLinkedList();

// Початкові елементи
list.addLast(10);
list.addLast(20);
list.addLast(30);

console.log("Початковий список:");
console.log(list.toString());

// 1
console.log("\n1) Додавання елементу 5 в початок списку");
list.addFirst(5);
console.log(list.toString());

// 2
console.log("\n2) Додавання елементу 40 в кінець списку");
list.addLast(40);
console.log(list.toString());

// 3
console.log("\n3) Видалення першого елементу");
console.log("Видалено:", list.removeFirst());
console.log(list.toString());

// 4
console.log("\n4) Видалення останнього елементу");
console.log("Видалено:", list.removeLast());
console.log(list.toString());

// 5
console.log("\n5.1) Перевірка наявності елементу 20");
console.log(list.contains(20));

console.log("\n5.2) Перевірка наявності елементу 999");
console.log(list.contains(999));

// 6
console.log("\n6) Отримання елементу за індексом 1");
console.log(list.getByIndex(1));

// 7
console.log("\n7) Вставляння елементу 15 за індексом 1");
list.insertAt(1, 15);
console.log(list.toString());

// 8
console.log("\n8) Видалення елементу за індексом 2");
console.log("Видалено:", list.removeAt(2));
console.log(list.toString());

// 9
console.log("\n9) Отримання найбільшого елементу");
console.log(list.getMax());

// 10
console.log("\n10) Отримання найменшого елементу");
console.log(list.getMin());

// 11
console.log("\n11) Отримання розміру списку");
console.log(list.size());

// 12
console.log("\n12) Форматований вивід списку");
console.log(list.toString());

// 13
console.log("\n13) Вставляння масиву [100,200,300] за індексом 1");
list.insertArrayAt(1, [100, 200, 300]);
console.log(list.toString());

// Фінальний стан
console.log("\nФінальний стан списку");
console.log(list.toString());
console.log("Розмір:", list.size());
