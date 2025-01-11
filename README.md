# siyuan-pseudocode 伪代码

## 介绍

该挂件基于[pseudocode.js](https://github.com/SaswatPadhi/pseudocode.js)和[KaTeX](https://github.com/Khan/KaTeX)构建，旨在为思源笔记提供基于LaTeX语法的伪代码的展示。

## 使用

* 将LaTeX的伪代码语法粘贴到文本框中，点击提交按钮，即可显示渲染的伪代码块。
* 点击修改按钮，渲染的伪代码块会隐藏，显示文本框。对文本框进行修改即可。

## LaTeX 伪代码相关语法介绍

具体可以参考[pseudocode.js](https://github.com/SaswatPadhi/pseudocode.js?tab=readme-ov-file#grammar)以及[algorithmic](https://ctan.org/pkg/algorithms)。

### 示例和注释

以下给出快速排序伪代码的示例以及中文注释。

```latex
% This quicksort algorithm is extracted from Chapter 7, Introduction to Algorithms (3rd edition)
% 声明algorithm块
\begin{algorithm}
% 标题
\caption{Quicksort}
% 声明algorithmic块
\begin{algorithmic}
% 定义函数（procedure）
\PROCEDURE{Quicksort}{$A, p, r$}
    % 判断逻辑
    \IF{$p < r$} 
        % 语句及函数调用
        \STATE $q = $ \CALL{Partition}{$A, p, r$}
        \STATE \CALL{Quicksort}{$A, p, q - 1$}
        \STATE \CALL{Quicksort}{$A, q + 1, r$}
    \ENDIF
\ENDPROCEDURE
\PROCEDURE{Partition}{$A, p, r$}
    \STATE $x = A[r]$
    \STATE $i = p - 1$
    % 循环逻辑
    \FOR{$j = p$ \TO $r - 1$}
        \IF{$A[j] < x$}
            \STATE $i = i + 1$
            \STATE exchange
            $A[i]$ with     $A[j]$
        \ENDIF
        \STATE exchange $A[i]$ with $A[r]$
    \ENDFOR
\ENDPROCEDURE
\end{algorithmic}
\end{algorithm}
```

伪代码渲染效果：

![Quicksort](https://github.com/samonysh/siyuan-pseudocode/blob/main/preview.png)

### 支持的宏（关键词）

* `$<math_expression>$`： 使用 `$` 将数学表达式包裹起来。
* `\STATE`：基本语句，用于描述算法的每一步操作。
* `\RETURN`：返回语句。
* `\PRINT`：打印输出。
* `\CALL{<name>}{<params>}`：调用函数。
* `\COMMENT{<text>}`：注释。

#### 输入输出

* `\REQUIRE` 或 `\INPUT`：表示输入。
* `\ENSURE` 或 `\OUTPUT`：表示输出。

#### 定义函数（过程）

```latex
\FUNCTION{<name>}{<params>}
    <block> 
\ENDFUNCTION
```

或

```latex
\PROCEDURE{<name>}{<params>}
    <block> 
\ENDPROCEDURE
```

#### 判断逻辑

```latex
\IF{<condition>}
    <block>
\ELIF{<condition>}
    <block>
\ELSE
    <block>
\ENDIF
```

#### 循环逻辑

```latex
# \WHILE, \FOR or \FORALL
\WHILE{<condition>}
    <block>
\ENDWHILE
```

## 参考与感谢

* [pseudocode.js](https://github.com/SaswatPadhi/pseudocode.js)
* [KaTeX](https://github.com/Khan/KaTeX)
* [在 Markdown 中书写伪代码](https://zhuanlan.zhihu.com/p/406649966)
* [基于LaTeX的伪代码书写](https://welts.xyz/2022/01/17/pseudocode/)
* [如何在博客中插入算法伪代码](https://zjuguoshuai.gitlab.io/2019/04/26/blog-pseudocode.html)