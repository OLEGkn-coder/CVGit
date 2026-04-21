package Labs.Labs09;

public class SearchWidthTest {
 public static void main(String[] args){
  SearchWidth tree = new SearchWidth();
  tree.Graph(4);
  tree.Edge(0, 1);
  tree.Edge(0, 2);
  tree.Edge(1, 2);
  tree.Edge(2, 0);
  tree.Edge(2, 3);
  tree.Edge(3, 3);
  tree.SearchInWidth(0);
 }
}
