package Labs.Labs07;

public class BubbleSort implements SorterStrategy{
 public void sort(Comparable[] arr){
 int a = arr.length;

     for(int i = 0; i < a - 1; i++){

       for(int j = 0; j < a - i - 1; j++){

        if(arr[j].compareTo(arr[j + 1]) > 0){
         
         Comparable b = arr[j];
         arr[j] = arr[j + 1];
         arr[j + 1] = b;
   }
  }
 }
}
}