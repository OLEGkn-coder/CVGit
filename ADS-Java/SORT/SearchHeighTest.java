package Labs.Labs09;

public class SearchHeighTest {
 public static void main(String[] args) {
   SearchHeight tree = new SearchHeight();
  tree.Graph(4);
  tree.Edge(0, 1);
  tree.Edge(0, 2);
  tree.Edge(1, 2);
  tree.Edge(2, 0);
  tree.Edge(2, 3);
  tree.Edge(3, 3);
  tree.SearchInHeight(0);
}}
