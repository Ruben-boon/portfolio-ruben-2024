#!/bin/bash

# Set strict mode for better error handling
set -euo pipefail

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" >&2
}

# Error handling function
error_exit() {
    log "ERROR: $1"
    exit 1
}

# Validate input function
validate_input() {
    local input="$1"
    local input_name="$2"
    
    if [ -z "$input" ]; then
        error_exit "$input_name cannot be empty"
    fi
}

# Prompt for module name
read -p "Enter the name of the module in snake_case: " MODULE_NAME
read -p "Copy the Icon name for sanity studio from: https://react-icons.github.io/react-icons/icons/ci/: " ICON_NAME

# Validate inputs
validate_input "$MODULE_NAME" "Module name"
validate_input "$ICON_NAME" "Icon name"

# Convert snake_case to camelCase
CAMEL_CASE_MODULE=$(echo "$MODULE_NAME" | awk -F'_' '{for (i=2; i<=NF; i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' OFS='')

# Convert snake_case to PascalCase
PASCAL_CASE_MODULE=$(echo "$MODULE_NAME" | awk -F'_' '{for (i=1; i<=NF; i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' OFS='')

# Convert to Human case (not an actual case name!)
HUMAN_CASE_READABLE=$(echo "$MODULE_NAME" | awk -F'_' '{for (i=1; i<=NF; i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' OFS=" ")

# Convert snake_case to kebab-case
KEBAB_CASE_MODULE=$(echo "$MODULE_NAME" | tr '_' '-')

# Configurable base directory (can be overridden by environment variable)
BASE_DIR="${PROJECT_BASE_DIR:-/Users/ruben/Git/portfolio-ruben-2024}"

# Validate base directory exists
[ -d "$BASE_DIR" ] || error_exit "Base directory $BASE_DIR does not exist"

# File paths
SCHEMA_NAME="schema.$CAMEL_CASE_MODULE.ts"
SCHEMA_PATH="$BASE_DIR/sanity/schemas/modules/$SCHEMA_NAME"
SCSS_PATH="$BASE_DIR/src/sass/ui/modules/_$KEBAB_CASE_MODULE.scss"
COMPONENT_PATH="$BASE_DIR/src/ui/modules/$PASCAL_CASE_MODULE.tsx"
MAIN_SCSS_PATH="$BASE_DIR/src/sass/main.scss"
SCHEMA_GLOBAL_PATH="$BASE_DIR/sanity/schema.ts"
SCHEMA_PAGES_PATH="$BASE_DIR/sanity/schemas/documents/schema.pages.ts"
MODULES_MODULE_PATH="$BASE_DIR/src/ui/modules/index.tsx"

# Function to safely create a file
safe_create_file() {
    local filepath="$1"
    local content="$2"
    
    if [ -f "$filepath" ]; then
        log "Warning: $filepath already exists. Skipping creation."
        return 1
    fi
    
    mkdir -p "$(dirname "$filepath")"
    echo "$content" > "$filepath" || error_exit "Failed to create $filepath"
    log "Created $filepath"
}

# Function to safely modify a file
safe_modify_file() {
    local filepath="$1"
    local marker="$2"
    local new_content="$3"
    
    if ! grep -q "$marker" "$filepath"; then
        error_exit "Marker '$marker' not found in $filepath"
    fi
    
    awk -v new_content="$new_content" "/$marker/{print; print new_content; next}1" "$filepath" > "${filepath}.tmp" || 
        error_exit "Failed to modify $filepath"
    
    mv "${filepath}.tmp" "$filepath"
    log "Modified $filepath"
}

# Create and populate SCSS file
safe_create_file "$SCSS_PATH" ".${KEBAB_CASE_MODULE} {

}"

# Create and populate schema file
safe_create_file "$SCHEMA_PATH" "import { defineField, defineType } from \"sanity\";
import { ${ICON_NAME} } from \"react-icons/ci\";

export default defineType({
  name: \"$CAMEL_CASE_MODULE\",
  title: \"$HUMAN_CASE_READABLE\",
  icon: ${ICON_NAME},
  type: \"object\",
  fields: [],
  preview: {
    select: {},
    prepare() {
      return {
        title: \"$HUMAN_CASE_READABLE\",
      };
    },
  },
});"

# Create and populate React component file
safe_create_file "$COMPONENT_PATH" "export default function ${PASCAL_CASE_MODULE}(
  {
    //   placeholder,
  }: Partial<{
    //   placeholder: any;
  }>
) {
  return <section className=\"${KEBAB_CASE_MODULE}\">

  </section>;
}"

# Modify files with markers
safe_modify_file "$MAIN_SCSS_PATH" "SCSS_IMPORT_MARKER" "@import \"ui/modules/$KEBAB_CASE_MODULE\";"

safe_modify_file "$SCHEMA_GLOBAL_PATH" "SCHEMA_IMPORT_MARKER" "import $CAMEL_CASE_MODULE from \"./schemas/modules/schema.$CAMEL_CASE_MODULE\";"
safe_modify_file "$SCHEMA_GLOBAL_PATH" "SCHEMA_TYPE_MARKER" "$CAMEL_CASE_MODULE,"

safe_modify_file "$SCHEMA_PAGES_PATH" "SCHEMA_OBJ_MARKER" "{ type: \"$CAMEL_CASE_MODULE\" },"

safe_modify_file "$MODULES_MODULE_PATH" "MODULE_IMPORT_MARKER" "import $PASCAL_CASE_MODULE from \"./$PASCAL_CASE_MODULE\";"
safe_modify_file "$MODULES_MODULE_PATH" "MODULE_CASE_MARKER" "case \"$CAMEL_CASE_MODULE\": return <$PASCAL_CASE_MODULE {...module} key={module._key} />;"

# Open files
log "Opening files"
code "$SCHEMA_PATH"
code "$SCSS_PATH"
code "$COMPONENT_PATH"

log "Module $MODULE_NAME created successfully."