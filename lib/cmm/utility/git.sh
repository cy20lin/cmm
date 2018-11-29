git_get_full_sha1() {
    sha="${1}"
    git rev-parse "${sha}^{commit}"
}

git_clone_without_checkout() {
    url="${1}"
    dst="${2}"
    git clone -n "${url}" "${dst}"
}

git_remote_origin_up_to_date() {
    dir="${1}"
    cd "${dir}" && git remote show origin | grep 'up to date'
}

git_is_valid_non_bare_repo() {
    # true
    dir="${1}"
    cd "${dir}" \
        && test -d .git \
        && test "`cd .git && pwd`" = "`cd $(git rev-parse --git-dir) && pwd`" \
        && git rev-parse --is-inside-work-tree
}

git_allow_reachable_sha1_in_want() {
    dir="${1}"
    cd "${dir}" \
        && git_is_valid_non_bare_repo . \
        && git config uploadpack.allowReachableSHA1InWant true
}

git_checkout_specific_commit() {
    src="${1}"
    dst="${2}"
    sha="${3}"
    src_="`cd "${src}" && pwd`"
    dst_="`cd "${dst}" && pwd`"
    echo "${src_}"
    echo "${dst_}"
    cwd="$(pwd)"
    mkdir -p "${dst_}" && cd "${dst_}" && git init \
        && git fetch --depth 1 "${src_}" "${sha}" \
        && git checkout FETCH_HEAD
}

# git_clone_without_checkout https://github.com/cy20lin/sweet sweet
# git_remote_origin_up_to_date sweet && echo t || echo f
# git_is_valid_non_bare_repo sweet && echo t || echo f
# git_is_valid_non_bare_repo sweet && echo t || echo f
# git_is_valid_non_bare_repo . && echo t || echo f
# git_allow_reachable_sha1_in_want sweet && echo t || echo f
git_checkout_specific_commit sweet a 639c4b953ab9be95cde08b0628e93070d86601c1 && echo t || echo f
# 6/39c4b953ab9be95cde08b0628e93070d86601c1
# https://stackoverflow.com/questions/29707280/how-to-tell-git-branch-name-from-commit-hash
