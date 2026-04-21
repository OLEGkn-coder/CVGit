#pragma once
#include <stdexcept>
#include <cstddef>

template <typename T>
class Array {
private:
	T* data;
	size_t size;
	size_t capacity;
	
public:
	Array() : data(nullptr), size(0), capacity(0) {} // Конструктор за замовчуванням

	Array(size_t _capacity) : data(new T[_capacity]), size(0), capacity(_capacity){}; // Конструктор

	~Array() {
		delete[] data;
	} // Дуконструктор

	Array(const Array& other) : data(new T[other.capacity]), size(other.size), capacity(other.capacity) {
		for (size_t i = 0; i < other.size; ++i) {
			data[i] = other.data[i];
		}
	} // Конструткор копіювання

	Array(Array&& other) : data(other.data), size(other.size), capacity(other.capacity) {
		other.data = nullptr;
		other.size = 0;
		other.capacity = 0;

	} // Move-констурктор

	Array& operator= (const Array& other) {
		if (this == &other) {
			return *this;
		}
		T* _data = new T[other.capacity];
		for (size_t i = 0; i < other.size; ++i) {
			_data[i] = other.data[i];
		}
		delete[] data;
		data = _data;
		size = other.size;
		capacity = other.capacity;
		return *this;
	} // Присвоєння

	Array& operator=(Array&& other) {
		if (this != &other) {
			delete[] data;

			data = other.data;
			size = other.size;
			capacity = other.capacity;
			other.data = nullptr;
			other.size = 0;
			other.capacity = 0;
		}
		return *this;
	} // Move-конструктор присвоєння

	T& operator[] (size_t index) {
		if (index >= size) {
			throw std::out_of_range("Array index out of bounds!");
		}
		return data[index];
	} // Оператор індексації

	const T& operator[] (size_t index) const {
		if (index >= size) {
			throw std::out_of_range("Array index out of bounds!");
		}
		return data[index];

	} // Константний оператор індексації

	size_t getSize() const {
		return size;
	} // Отримати розмір динамічного масиву

	size_t getCapacity() const {
		return capacity;
	} // Отримати ємність динамічного масиву

	void insert(size_t index, const T& value) {
		if (index > size) {
			throw std::out_of_range("Array index out of bounds!");
		}
		if (size == capacity) {
			if (capacity == 0) {
				capacity = 1;
			}
			size_t _capacity = capacity * 2;
			T* _data = new T[_capacity];
			for (size_t i = 0; i < size; ++i) {
				_data[i] = data[i];
			}
			delete[] data;
			data = _data;
			capacity = _capacity;
		}
			for (size_t i = size; i > index; --i) {
				data[i] = data[i-1];
			}
			data[index] = value;
			++size;
	} // Втсаивти елемент за індексом

	void remove(size_t index) {
		if (index >= size) {
			throw std::out_of_range("Array index out of bounds!");
		}
		for (size_t i = index; i < size - 1; ++i) {
			data[i] = data[i + 1];
		}
		--size;
	} // Видалити елемент за індексом

	bool contain(const T& value) const {
		for (size_t i = 0; i < size; ++i) {
			if (data[i] == value) {
				return true;
			}
		}

		return false;
	} // Перевріити наявність елемента в масиві, за занченням
};