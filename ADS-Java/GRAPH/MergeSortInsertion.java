package Labs.Labs07;
import java.util.Arrays;
public class MergeSortInsertion implements SorterStrategy{
 public void sort(Comparable[] arr){
  if(arr.length <= 1){
   return;
  }
  Comparable [] left = Arrays.copyOfRange(arr, 0, arr.length/2);
  Comparable [] right = Arrays.copyOfRange(arr, arr.length/2, arr.length);
  InsertSort(left);
  InsertSort(right);
  sort(left);
  sort(right);
  Merge(arr, left, right);
 }

 public static void Merge(Comparable[] arr, Comparable[] left, Comparable[] right){
  int i = 0;
  int j = 0;
  int r = 0;
  while(i < left.length && j < right.length){
   if(left[i].compareTo(right[j]) <= 0){
    arr[r++] = left[i++];
   }else {
    arr[r++] = right[j++];
   }
  }
  while(i < left.length){
   arr[r++] = left[i++];
  }
  while(j < right.length){
   arr[r++] = right[j++];
  
  }
 }

public static void InsertSort(Comparable [] arr){
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
