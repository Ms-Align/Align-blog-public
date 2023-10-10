---
icon: article
title: The sx prop
author: Align
date: 2023-09-20
category:
  - 前端
tag:
  - MUI System

order: 97
---

# The sx prop

*The sx prop is a shortcut for defining custom styles that has access to the theme.*

sx 属性是定义可以访问主题的自定义样式的快捷方式。

*The `sx` prop lets you work with a superset of CSS that packages all of the style functions exposed in `@mui/system`*

* You can specify any valid CSS using this prop, as well as many theme-aware properties that are unique to MUI System.*

## Basic example

*The following demo illustrates how to work with the `sx` prop. Note that not all of the values are valid CSS properties—that's because the `sx` keys are mapped to specific properties of the theme. The rest of this document explores this concept in more detail.*

以下演示说明了如何使用 sx 属性。

::: warning

并非所有值都是有效的 CSS 属性，这是因为 sx 下的属性会被映射到主题中的特定属性。

:::

本节的其余部分将详细的讨论这个概念。

```js
import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default function Example() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          98.3 K
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          +18.77%
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          vs. last week
        </Box>
      </Box>
    </ThemeProvider>
  );
}
```

