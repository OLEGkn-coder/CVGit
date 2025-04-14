package Labs.Labs07;

public class CombSort implements SorterStrategy {
 public void sort(Comparable [] arr){
  int a = arr.length;
  int gap = a;
  boolean sw = true;
while(gap > 1 || sw == true){
  gap  = (int) (gap / 1.3);
  if(gap < 1){
   gap = 1;
  }

  sw = false;
  for(int i = 0; i + gap < a; i++){
   if(arr[i].compareTo(arr[i + gap]) > 0){
    Comparable b = arr[i];
    arr[i] = arr[i + gap];
    arr[i + gap] = b;
    sw = true;
   }
  }
 }
 }
}
