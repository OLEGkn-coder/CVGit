package Labs.Labs07;
public class SelectionSort implements SorterStrategy {
 public void sort (Comparable [] arr){
  int a = arr.length;
  for(int i = 0; i < a - 1; i++){
    int min = i;
    for(int j = i + 1; j < a; j++){
      if(arr[j].compareTo(arr[min]) < 0){
        min = j;
      }
    }
    if (min != i){
      Comparable b = arr[i];
      arr[i] = arr[min];
      arr[min] = b;
     }
   }
  }
}
