
# INFORME: Guía de Uso de Git y Flujo de Trabajo para Desarrolladores

---

## Introducción

Este informe tiene como objetivo proporcionar una guía práctica para el uso de Git y la gestión de un flujo de trabajo estándar en el proyecto. A continuación, se explicará el proceso de creación y manejo de ramas (branches), el flujo de trabajo recomendado y los pasos detallados para crear Pull Requests (PRs) y realizar merges en las ramas `develop`, `testing` y `main`.

---

## 1. Introducción a Git y Control de Versiones

Git es un sistema de control de versiones que permite registrar y controlar cambios en el código de manera colaborativa. Los desarrolladores pueden trabajar en sus propios entornos, fusionar (merge) sus cambios con los de otros y revertir modificaciones si es necesario. 

Es fundamental utilizar Git para:
- Llevar un registro de cada cambio en el proyecto.
- Colaborar eficientemente con otros desarrolladores.
- Facilitar el flujo de trabajo y prevenir conflictos en el código.

---

## 2. Flujo de Trabajo en Git con Ramas (Branches)

En un proyecto colaborativo, es esencial trabajar en un flujo de ramas organizado. A continuación, se presenta una estructura comúnmente usada en el desarrollo de software:

- **Main**: Contiene el código en producción, es decir, la versión estable del proyecto.
- **Develop**: Es la rama donde se integran las características nuevas antes de ser lanzadas a producción. Sirve como una fase de pruebas internas.
- **Testing**: Es una rama usada para pruebas avanzadas o finales. Aquí se verifica la calidad del código antes de hacer un merge con `main`.
- **Feature Branches**: Ramas específicas para desarrollar una nueva característica o corregir un error. Se crean desde `develop` y se eliminan una vez finalizado el merge en `develop`.

### Crear una Rama Nueva

1. Asegúrate de estar en la rama `develop`:
   ```bash
   git checkout develop
   ```
2. Actualiza `develop` para asegurar que tienes los últimos cambios:
   ```bash
   git pull origin develop
   ```
3. Crea una nueva rama para tu tarea:
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```

---

## 3. Flujo de Trabajo para Crear Pull Requests

Una Pull Request (PR) es una solicitud para revisar y fusionar tu código con otra rama. A continuación, se explica cómo realizar una PR de forma correcta:

1. **Añadir y Confirmar Cambios (Commits):**
   Una vez hayas realizado los cambios en tu rama, añade los archivos modificados y haz un commit:
   ```bash
   git add .
   git commit -m "Descripción de los cambios realizados"
   ```

2. **Subir los Cambios a GitHub/GitLab:**
   Para crear una PR, primero debes subir tu rama al repositorio remoto:
   ```bash
   git push origin feature/nueva-caracteristica
   ```

3. **Crear la Pull Request (PR):**
   - Ve al repositorio en GitHub.
   - Localiza la opción "New Pull Request" y selecciona la rama `develop` como destino de la fusión y tu rama `feature/nueva-caracteristica` como la fuente.
   - Agrega una descripción detallada de los cambios realizados para que tus compañeros puedan entender el propósito de la PR.

4. **Solicitar Revisión:**
   - Asigna a miembros del equipo para que revisen tu PR y espera sus comentarios.
   - Si es necesario realizar modificaciones, realiza cambios en tu rama, haz nuevos commits y sube los cambios.

---

## 4. Fusión de Cambios (Merge) en el Flujo de Trabajo

Una vez aprobada la PR, se puede realizar el merge en las ramas `develop`, `testing` y `main` de acuerdo con el flujo siguiente:

### Fusión en `develop`
1. Asegúrate de que la PR haya sido aprobada.
2. Realiza el merge de la PR en `develop` (esto puede hacerse en la plataforma o desde la terminal):
   ```bash
   git checkout develop
   git merge feature/nueva-caracteristica
   git push origin develop
   ```
3. Elimina la rama `feature` en GitHub/GitLab si ya no es necesaria.

### Fusión en `testing`
1. Una vez que todos los cambios de la versión estén en `develop`, crea una PR de `develop` a `testing`.
2. Verifica que los cambios pasen todas las pruebas en `testing`.
3. Realiza el merge en `testing`.

### Fusión en `main`
1. Una vez verificado y aprobado en `testing`, crea una PR de `testing` a `main`.
2. Asegúrate de que todo esté en orden para producción.
3. Realiza el merge en `main`.

---

## 5. Resolución de Conflictos

En caso de que surjan conflictos:
1. Git te notificará sobre los archivos en conflicto.
2. Revisa los archivos involucrados y edítalos para resolver los conflictos.
3. Confirma los cambios y completa el merge:
   ```bash
   git add .
   git commit -m "Conflictos resueltos en archivo X"
   git push origin nombre-de-la-rama
   ```

---

## Conclusión

Este flujo de trabajo garantiza una integración organizada y confiable. La correcta implementación del flujo de ramas y PRs optimiza el trabajo en equipo y ayuda a mantener el código limpio y seguro para producción.
