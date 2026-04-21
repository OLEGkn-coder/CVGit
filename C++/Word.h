#pragma once
#include <string>
#include <cstring>
#include <iostream>

template <std::size_t N = 16>
class Word {
private:
	char data[N];

public:
	Word() {
		data[0] = '\0';
	} // Конструктор за замовчуванням

	Word(const std::string& str) {
		size_t j = 0;
		for (size_t i = 0; i < N - 1 && i < str.size(); ++i) {
			data[i] = str[i];
			j++;
		}
		data[j] = '\0';
	} // Конструктор перетворення

	Word(const char* str) {
		if (str == nullptr) {
			data[0] = '\0';
			return;
		}
		
		size_t j = 0;
		for (size_t i = 0; i < N - 1 && str[i] != '\0'; ++i) {
			data[i] = str[i];
			j++;
		}

		data[j] = '\0';
	} // Конструктор від C-рядка

	bool operator== (const Word& other) const {
		return std::strcmp(data, other.data) == 0;
	} // Оператор порівняння
	
	bool operator!= (const Word& other) const {
		return !(*this == other);
	} // Оператор не дорівнює

	bool operator< (const Word& other) const {
		return std::strcmp(data, other.data) < 0;
	} // Оператор менше

	bool operator> (const Word& other) const {
		return std::strcmp(data, other.data) > 0;
	} // Оператор більше

	friend std::ostream& operator<<(std::ostream& s, const Word<N>& w) {
		s << w.data;
		return s;
	} // Виведення
};
