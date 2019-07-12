// Anything which inherits from a class should be substitutable for that class. 

interface FurnitureItem {
    legs: number
}

class Couch implements FurnitureItem {
    legs = 4
}

// OOH Convenient! It has 4 legs! So does a Cow, and I need to write a Cow class real fast so:
class Cow extends Couch {}

// Hmm that's not what we meant. 