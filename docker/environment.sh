#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
#set -o xtrace

# ----------------------------------------------
# ----------[Dados de apoio ao script]----------
# ----------------------------------------------

readonly __DIR__="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly __FILE__="${__DIR__}/$(basename "${BASH_SOURCE[0]}")"
readonly __BASE__="$(basename ${__FILE__} .sh)"
readonly __ROOT__="$(cd "$(dirname "${__DIR__}")" && pwd)"

# ----------------------------------------------
# --------------[Inicio do script]--------------
# ----------------------------------------------

declare -A frontend

readonly frontend=(
    [APP_ENV]="${1:-}"
    [ROOT_APP_PATH]="${2:-}"
    [SIGOMS_USERS_LOGIN]="${3:-}"
)

function create()
{
    cat  > "${frontend[ROOT_APP_PATH]}"/.env <<< APP_ENV=${frontend[APP_ENV]}
    cat >> "${frontend[ROOT_APP_PATH]}"/.env <<< ROOT_APP_PATH=${frontend[ROOT_APP_PATH]}
    cat >> "${frontend[ROOT_APP_PATH]}"/.env <<< SIGOMS_USERS_LOGIN=${frontend[SIGOMS_USERS_LOGIN]}
}

create