#include "Dictionary.h"
#include "Word.h"
#include <sstream>
#include <string>
#include <iostream>
#include <cassert>
#include <stdexcept>

using namespace std;

int main() {

	try{
	cout << "Testing dictionary and classes" << endl;

	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;

	// Завдання 5 - "рибка" lorem
	cout << "Filling the dictionary with a line of at least 100 words" << endl;

	cout << endl;
	
	Dictionary<string> dict01;
	cout << "Capacity before: " << dict01.getCapacity() << endl;
	cout << "Size before: " << dict01.getSize() << endl;
	string text =
			R"(Lorem ipsum dolor sit amet consectetuer adipiscing elit Maecenas porttitor congue massa Fusce posuere magna sed pulvinar ultricies purus lectus malesuada libero sit amet commodo magna eros quis urna Nunc viverra imperdiet enim Fusce est Vivamus a tellus
	Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas Proin pharetra nonummy pede Mauris et orci Aenean nec lorem In porttitor Donec laoreet nonummy augue
	Suspendisse dui purus scelerisque at vulputate vitae pretium mattis nunc Mauris eget neque at sem venenatis eleifend Ut nonummy Fusce aliquet pede non pede Suspendisse dapibus lorem pellentesque magna Integer nulla
	Donec blandit feugiat ligula Donec hendrerit felis et imperdiet euismod purus ipsum pretium metus in lacinia nulla nisl eget sapien Donec ut est in lectus consequat consequat Etiam eget dui Aliquam erat volutpat Sed at lorem in nunc porta tristique
	Proin nec augue Quisque aliquam tempor magna Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas Nunc ac magna Maecenas odio dolor vulputate vel auctor ac accumsan id felis Pellentesque cursus sagittis felis)";
	stringstream strstream(text);
	string word;
	while (strstream >> word) {
		dict01.insert(word);
	}
	assert(dict01.contain("Lorem"));
	assert(dict01.contain("ipsum"));
	assert(dict01.contain("dolor"));
	assert(dict01.contain("felis"));
	assert(dict01.getSize() && dict01.getCapacity() != 0);
	cout << "Capacity after: " << dict01.getCapacity() << endl; // 128
	cout << "Size after: " << dict01.getSize() << endl; // 108

	cout << endl;

	cout << "Tested successfully" << endl;
	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;

	// Завданян 6 - коректність копіювання і переміщення
	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;
	cout << "Testing the correctness of copying and moving the dictionary"<< endl;

	cout << endl;

	cout << "Copying" << endl;
	Dictionary <string> dict02(dict01);
	cout << "Dictionary 01 size before: " << dict01.getSize() << " capacity before: " << dict01.getCapacity() << endl;
	assert(dict01 == dict02);
	assert(dict01.getCapacity() == dict02.getCapacity());
	assert(dict01.getSize() == dict02.getSize());
	cout << "Dictionary 01 size after: " << dict01.getSize() << " capacity after: " << dict01.getCapacity() << endl;
	cout << "Dictionary 02 size: " << dict02.getSize() << " capacity: " << dict02.getCapacity() << endl;
	cout << "Copying tested successfully" << endl;

	cout << endl;

	cout << "Moving" << endl;
	cout << "Dictionary 01 size before: " << dict01.getSize() << " capacity before: " << dict01.getCapacity() << endl;
	Dictionary <string> dict03(move(dict01));
	assert(dict03.getSize() == 108);
	assert(dict03.getCapacity() == 128);
	assert(dict01.getSize() == 0);
	assert(dict01 != dict03);
	cout << "Dictionary 01 size after: " << dict01.getSize() << " capacity after: " << dict01.getCapacity() << endl;
	cout << "Dictionary 03 size: " << dict03.getSize() << " capacity after: " << dict03.getCapacity() << endl;
	
	cout << endl;

	cout << "Moving tested successfully" << endl;

	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;

	// Завдання 8 - транспортування словника dict в словник Dictionary<Word<N>> edict
	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;
	cout << "Transporting the dictionary" << endl;

	cout << endl;
	
	Dictionary <Word<16>> edict;
	cout << "Dictionary 03 size before: " << dict03.getSize() << " capacity before: " << dict03.getCapacity() << endl;
	cout << "Dictionary edict size before: " << edict.getSize() << " capacity before: " << edict.getCapacity() << endl;
	for (auto i = dict03.begin(); i != dict03.end(); ++i) {
		edict.insert(*i);
	}
	cout << endl;
	assert(edict.getSize() == 108);
	assert(edict.getCapacity() == 128);
	assert(Word<16>(*dict03.begin()) == Word<16>(*edict.begin()));
	cout << "Dictionary 03 size after: " << dict03.getSize() << " capacity after: " << dict03.getCapacity() << endl;
	cout << "Dictionary edict size after: " << edict.getSize() << " capacity after: " << edict.getCapacity() << endl;

	cout << endl;

	cout << "Transporting tested successfully" << endl;
	
	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;

	// Завдання 9-10 - формування edit1, edit2, edit3, edit6
	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;
	cout << "Even, odd, formation, union, multiples of 3, multiples of 6, intersection" << endl;

	cout << endl;
	
	Dictionary<Word<16>> edict1, edict2, edict3, edict6;
	size_t j = 0;

	for (auto i = edict.begin(); i != edict.end(); ++i) {
		if (j % 2 != 0) {
			edict1.insert(*i);
		}

		if (j % 2 == 0) {
			edict2.insert(*i);
		}

		if (j % 3 == 0) {
			edict3.insert(*i);
		}
		
		if (j % 6 == 0) {
			edict6.insert(*i);
		}
		
		++j;
	}
	cout << "edict1 size: " << edict1.getSize() << endl;
	cout << "edict2 size: " << edict2.getSize() << endl;

	cout << endl;

	Dictionary <Word<16>> unit_edict = edict1 + edict2;
	cout << "edict1 + edict2 = " << unit_edict.getSize() << endl;

	cout << endl;

	cout << "edict3 size: " << edict3.getSize() << endl;
	cout << "edict6 size: " << edict6.getSize() << endl;

	cout << endl;

	Dictionary <Word<16>> crossing_edict = edict2 * edict3;
	cout << "edict2 * edict3 = " << crossing_edict.getSize() << endl;

	cout << endl;

	assert(edict1 + edict2 == edict);
	assert(edict2 * edict3 == edict6);

	cout << "First word in edict1: " << *edict1.begin() << endl;
	cout << "First word in edict2: " << *edict2.begin() << endl;
	cout << "First word in edict3: " << *edict3.begin() << endl;
	cout << "First word in edict6: " << *edict6.begin() << endl;

	cout << endl;

	cout << "Tested successfully" << endl;
	
	cout << endl;
	cout << "---------------------------------------------------------------------" << endl;
	cout << endl;

	// Додатково, перевірка на захист від виходу за межі

	cout << "Additional check for exit for out of bounds: " << endl;

	try {
		Array<int> test01;
		test01.remove(5);
		cout << "Fail" << endl;
	}
	catch (const std::out_of_range& err) {
		cout << "Successfully. Error: " << err.what() << endl;
	}

	try {
		Array<int> test02;
		test02[5];
		cout << "Fail" << endl;
	}
	catch (const std::out_of_range& err) {
		cout << "Successfully. Error: " << err.what() << endl;
	}

	try {
		Array<int> test03;
		test03.insert(10, 6);
		cout << "Fail" << endl;
	}
	catch (const std::out_of_range& err) {
		cout << "Successfully. Error: " << err.what() << endl;
	}

	return 0;

} catch
	(const exception& err) { 
	cerr << "Error: " << err.what() << endl;
	return 1;
}
}