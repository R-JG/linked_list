const LinkedList = (headNodeValue) => {

    // private variables and functions ------------------------------

    const _NewNode = (value) => ({
        value,
        previous: null,
        next: null,
    });

    let _head = _NewNode(headNodeValue);

    const _traverseToEnd = (_node) => {
        if (_node === undefined) _node = _head;
        if (_node.next === null) return _node;
        return _traverseToEnd(_node.next);
    };

    const _traverseToIndex = (index) => {
        let node = _head;
        for (let i = 0; i <= index; i++) {
            if (node === null) return "invalid index";
            if (i === index) break;
            node = node.next;
        };
        return node;
    };

    const _traverseToValue = (value, _node, _index) => {
        if (_index === undefined) _index = 0;
        if (_node === undefined) _node = _head;
        if (_node === null) return "value not found";
        if (_node.value === value) return {index: _index, node: _node};
        return _traverseToValue(value, _node.next, (_index += 1));
    };

    // write functions ----------------------------------------------

    const append = (value) => {
        const tail = _traverseToEnd();
        tail.next = _NewNode(value);
        tail.next.previous = tail;
    };

    const prepend = (value) => {
        const oldHead = _head;
        _head = _NewNode(value);
        _head.next = oldHead;
        _head.next.previous = _head;
    };

    const insertAtIndex = (value, index) => {
        const indexedNode = _traverseToIndex(index);
        if (typeof indexedNode === "string") {
            console.log(indexedNode); 
            return;
        };
        const newNode = _NewNode(value);
        newNode.next = indexedNode;
        newNode.previous = indexedNode.previous;
        if (index === 0) {
            indexedNode.previous = newNode;
            _head = newNode;
            return;
        };
        indexedNode.previous.next = newNode;
        indexedNode.previous = newNode;
    };

    const deleteAtIndex = (index) => {
        const indexedNode = _traverseToIndex(index);
        if (typeof indexedNode === "string") {
            console.log(indexedNode);
            return;
        };
        if (indexedNode.next === null) {
            indexedNode.previous.next = indexedNode.next;
            return;
        };
        indexedNode.next.previous = indexedNode.previous;
        if (index === 0) {
            _head = indexedNode.next;
            return;
        };
        indexedNode.previous.next = indexedNode.next;
    };

    const pop = () => {
        const tailNode = _traverseToEnd();
        tailNode.previous.next = null;
        return tailNode.value;
    };

    const shift = () => {
        const oldHeadValue = _head.value;
        _head.next.previous = null;
        _head = _head.next;
        return oldHeadValue;
    };

    // read functions -----------------------------------------------

    const getHead = () => {
        console.log("head:");
        console.log(_head); 
        return _head
    };

    const getTail = () => {
        const result = _traverseToEnd();
        console.log("tail:");
        console.log(result);
        return result;
    };

    const getIndex = (index) => {
        const result = _traverseToIndex(index);
        console.log(`node at index ${index}:`);
        console.log(result);
        return result;
    };

    const findValue = (value) => {
        return _traverseToValue(value);
    };

    const getSize = () => {};

    const listToString = () => {};

    return { 
        append, 
        prepend, 
        insertAtIndex, 
        deleteAtIndex, 
        pop, 
        shift, 
        getHead, 
        getTail, 
        getIndex,
        findValue
    };
};

