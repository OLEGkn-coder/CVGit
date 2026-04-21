#pragma once
#include "Array.h"

template <typename T> 
class Dictionary {
private:
	Array<T> data;

public:
class Iterator { // Вкладений клас-ітератор
private:
	Array<T>* data;
	size_t index;

public:
	Iterator(Array<T> * _data, size_t _index) : data(_data), index(_index){}

	T& operator*() {
		return (*data)[index];
	} // Посилання на поточний елемент

	Iterator& operator++() {
		++index;
		return *this;
	} // Наступний елемент

	bool operator!=(const Iterator& other) const {
		if (index == other.index) {
			return false;
		}

		return true;
	} // Порівнюємо індекси на рівність
};

Iterator begin() {
	return Iterator(&data, 0);
} // Ітератор для проходження

Iterator begin() const {
	return Iterator(const_cast<Array<T>*>(&data), 0);
} // Константний ітератор для проходження

Iterator end() {
	return Iterator(&data, data.getSize());
} // Теж ітератор для прохождження

Iterator end() const {
	return Iterator(const_cast<Array<T>*>(&data), data.getSize());
} // Ще один константний ітератор для прохождення

size_t getSize() const {
	return data.getSize();
}

size_t getCapacity() const {
	return data.getCapacity();
}

bool operator==(const Dictionary& other) const {
	if (data.getSize() != other.data.getSize()) {
		return false;
	}
	for (size_t i = 0; i < data.getSize(); ++i) {
		if (data[i] != other.data[i]) {
			return false;
		}
	}
	return true;
} // Порівнюємо кожен елемент(якщо розмір рівний), якщо хоч якась пара елементів не рівна, кидаємо false

bool operator!=(const Dictionary& other) const {
	if (data.getSize() != other.data.getSize()) {
		return true;
	}
	for (size_t i = 0; i < data.getSize(); ++i) {
		if (data[i] != other.data[i]) {
			return true;
		}
	}
	return false;
}
	
	void insert(const T& value) {
		for (size_t i = 0; i < data.getSize(); ++i) {
			if (data[i] == value) {
				return;
			}
			if (data[i] > value) {
				data.insert(i, value);
				return;
			}
		}
		data.insert(data.getSize(), value);
	} // Вставляємо елемент, попередньо перевіряємо чи його там немає, якщо ні, шукаємо перший більший елемент, і вставляємо перед ним, якщо такого немає, вставляємо в кінець

	bool contain(const T& value) const {
		if (data.getSize() == 0) {
			return false;
		}
		return data.contain(value);
	} // Перевіряємо чи є елемент

	void remove(const T& value) {
		for (size_t i = 0; i < data.getSize(); ++i) {
			if (data[i] == value) {
				data.remove(i);
				return;
			}
		}
	} // Видаляємо елемент, якщо він є

	Dictionary operator+(const Dictionary& other) const {
		Dictionary result;
		for (size_t i = 0; i < data.getSize(); ++i) {
			result.insert(data[i]);
		}
		for (size_t i = 0; i < other.data.getSize(); ++i) {
			result.insert(other.data[i]);
		}
		return result;
	}  // Вставляємо елементи, метож insert містить перевірку на дублікати, та відразу сортує, тому гарантовано не буде дублів і не відсортованих елементів

	Dictionary operator*(const Dictionary& other) const {
		Dictionary result;
		for (size_t i = 0; i < data.getSize(); ++i) {
			if (other.contain(data[i])) {
				result.insert(data[i]);
			}
		}
		return result;
	} // Дивимося, чи є елементи які перетинаються, якщо так то вставляємо їх в result, використовуємо раніше написаний метод contain
};

template <typename T>
void copy(Dictionary<T>& dst, const Dictionary<T>& src) {
	for (auto i = src.begin(); i != src.end(); ++i) {
		dst.insert(*i);
	}
} // Копієюмо елементи, insert контролює відсутність дублів і впорядкований вигляд

template <typename T>
void merge_into(Dictionary<T>& dst, Dictionary<T>&& src) {
	for (auto i = src.begin(); i != src.end(); ++i) {
		dst.insert(*i);
	}

	while (src.begin() != src.end()) {
		src.remove(*src.begin());
	}
}// Переміщуємо елементи, й потім їх видаляємо
