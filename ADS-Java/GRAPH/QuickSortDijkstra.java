package Labs.Labs07;

public class QuickSortDijkstra implements SorterStrategy {
  public void sort(Comparable[] arr){
   QuickSortMain(arr, 0, arr.length - 1);
  }

  public static void QuickSortMain(Comparable[] arr, int lo, int hi){
   if(lo < hi){
    int pivot = (int)part(arr, lo, hi);
    QuickSortMain(arr, lo, pivot - 1);
    QuickSortMain(arr, pivot + 1, hi);
   }
  }

  public static Comparable part (Comparable [] arr, int lo, int hi){
   Comparable pivot = arr[hi];
   int a = lo;
   int c = lo;
   int r = hi;
   while(c <= r){
    int cmp = arr[c].compareTo(pivot);
    if(cmp < 0){
     swap(arr, a++, c++);
    }else if(cmp > 0){
     swap(arr, c, r--);
    }else {
      c++;
     }
    }
    return a;
   }
   public static void swap(Comparable[] arr, int i, int j){
   Comparable b = arr[i];
   arr[i] = arr[j];
   arr[j] = b;
  } 
}
