package Labs.Labs07;

public class QuickSortInsertion implements SorterStrategy{
 public void sort(Comparable[] arr){
  QuickSortMain(arr, 0, arr.length - 1);
 }

 public static void QuickSortMain(Comparable[] arr, int lo, int hi){
  InsertSort(arr, lo, hi);
  if(lo < hi){
   int pivot = (int) part(arr, lo, hi);
   QuickSortMain(arr, lo, pivot - 1);
   QuickSortMain(arr, pivot + 1, hi);
  }
 }

 public static Comparable part(Comparable[] arr, int lo, int hi){
  Comparable pivot = arr[hi];
  int a = lo - 1;
  for(int i = lo; i < hi; i++){
   if(arr[i].compareTo(pivot) <= 0){
    a++;
    Comparable b = arr[a];
    arr[a] = arr[i];
    arr[i] = b;
   }
  }
  Comparable b = arr[a + 1];
  arr[a + 1] = arr[hi];
  arr[hi] = b;
  return a + 1;
 }
 
 public static void InsertSort(Comparable[] arr, int lo, int hi){
  for(int i = lo + 1; i <= hi; i++){
   Comparable a = arr[i];
   int j = i - 1;
   while(j >= lo && arr[j].compareTo(a) > 0){
    arr[j + 1] = arr[j];
    j--;
   }
   arr[j + 1] = a;
  }
 }
}
