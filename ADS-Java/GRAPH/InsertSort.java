package Labs.Labs07;

public class InsertSort implements SorterStrategy{
 public void sort(Comparable[] arr){
 int a = arr.length;
 for(int i = 1; i < a; i++){
  Comparable b = arr[i];
  int j = i - 1;
  while(j >= 0 && arr[j].compareTo(b) > 0){
   arr[j + 1] = arr[j];
   j--;
  }
  arr[j+1] = b; 
 }
 }
}
