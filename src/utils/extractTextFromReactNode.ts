import { Children, isValidElement } from 'react';

export default function extractTextFromReactNode(
  node: React.ReactNode
): string {
  if (typeof node === 'string') {
    // Если узел является строкой, возвращаем его без изменений
    return node;
  } else if (isValidElement(node)) {
    // Если узел является элементом React
    // Рекурсивно обрабатываем его дочерние элементы
    return Children.toArray(node.props.children)
      .map((child) => extractTextFromReactNode(child))
      .join('');
  } else {
    // Если узел не является строкой или элементом React, возвращаем пустую строку
    return '';
  }
}
