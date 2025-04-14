package Labs.Labs07;
public class ShellSort implements SorterStrategy{
 public void sort(Comparable [] arr){
  int a = arr.length;
  for(int gap = a/2; gap > 0; gap /= 2){
   for (int i = gap; i < a; i++){
    Comparable b = arr[i];
    int j = i;
    while(j >= gap && arr[j - gap].compareTo(b) > 0){
     arr[j] = arr[j - gap];
     j -= gap;
    }
    arr[j] = b;
   }
  }
 }
}
   