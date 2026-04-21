package Labs.Labs07;
import java.io.*;
import java.util.*;
public class SorterTest {
 private static final int[] SIZES = {1024, 2048, 4096, 8192, 16384, 32768};
 public static void main(String[] args) {


 
 SorterStrategy[] strategies = {
  new BubbleSort(),
  new InsertSort(),
  new SelectionSort(),
  new ShellSort(),
  new CombSort(),
  new MergeSort(),
  new QuickSort(),
  new MergeSortInsertion(),
  new MergeSortElementComp(),
  new MergeSortWithBoth(),
  new QuickSortInsertion(),
  new QuickSortDijkstra(),
  new QuickSortWithBoth()
 };



 long start, now, time;
 try{
  PrintWriter wr = new PrintWriter(new FileWriter("ResultOfTesting.txt"), true);
 for(int size : SIZES){
  wr.println("Size: " + size);
  Comparable[] arr = GenerateArrays(size);

  for(SorterStrategy strategy : strategies){
    Comparable [] clonedArray = arr.clone();
    start = System.nanoTime();
    strategy.sort(clonedArray);
    now = System.nanoTime();
    time = now - start;
  
      wr.println(strategy.getClass() + ": " + time + " , sorted: " +  isSorted(clonedArray));
  
  }
}
} catch (IOException e){
  e.printStackTrace();
 }}
 
 private static Comparable[] GenerateArrays(int size){
  Random random = new Random();
  Comparable[] arr = new Comparable[size];
  for(int i = 0; i < size; i++){
   arr[i] = random.nextInt();
  }
  return arr;
 }
 private static boolean isSorted(Comparable[] arr){
  for(int i = 0; i < arr.length - 1; i++){
   if(arr[i].compareTo(arr[i + 1]) > 0 ){
    return false;
   }
  }
  return true;
 }
 }
 
